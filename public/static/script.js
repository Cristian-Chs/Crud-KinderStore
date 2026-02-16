// API Base URL
const API_URL = '/api';

// Estado global
let clientes = [];
let editandoId = null;
let currentPage = 1;
let totalPages = 1;
const LIMIT = 10;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    configurarEventListeners();
    cargarClientes(); // Carga pagina 1 por defecto
    establecerFechaActual();
});

// Configurar event listeners
function configurarEventListeners() {
    // Botones de nuevo cliente
    document.getElementById('btnNuevoCliente').addEventListener('click', abrirModalNuevo);
    document.getElementById('btnNuevoClienteEmpty').addEventListener('click', abrirModalNuevo);
    
    // Paginación
    document.getElementById('btnPrevPage').addEventListener('click', () => cambiarPagina(-1));
    document.getElementById('btnNextPage').addEventListener('click', () => cambiarPagina(1));
    
    // Cerrar modal
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
    document.getElementById('btnCancelar').addEventListener('click', cerrarModal);
    document.getElementById('modalCliente').addEventListener('click', (e) => {
        if (e.target.id === 'modalCliente') cerrarModal();
    });
    
    // Formulario
    document.getElementById('formCliente').addEventListener('submit', guardarCliente);
    
    // Búsqueda
    document.getElementById('searchInput').addEventListener('input', buscarClientes);
    
    // Excel
    document.getElementById('btnExportar').addEventListener('click', exportarExcel);
    document.getElementById('fileImport').addEventListener('change', importarExcel);
    document.getElementById('btnPlantilla').addEventListener('click', descargarPlantilla);
}

// Cambiar página
function cambiarPagina(delta) {
    const nuevaPagina = currentPage + delta;
    if (nuevaPagina >= 1 && nuevaPagina <= totalPages) {
        currentPage = nuevaPagina;
        cargarClientes();
    }
}

// Cargar clientes desde la API
async function cargarClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes?page=${currentPage}&limit=${LIMIT}`);
        if (!response.ok) throw new Error('Error al cargar clientes');
        
        const data = await response.json();
        
        // Manejar respuesta paginada o lista simple (compatibilidad)
        if (data.data) {
            clientes = data.data;
            totalPages = data.total_pages;
            currentPage = data.page;
            actualizarControlesPaginacion();
        } else {
            // Fallback por si la API no devuelve paginación aún
            clientes = data;
        }

        renderizarTabla(clientes);
    } catch (error) {
        console.error('Error:', error);
        mostrarToast('Error al cargar los clientes', 'error');
    }
}

function actualizarControlesPaginacion() {
    const container = document.getElementById('paginationContainer');
    const info = document.getElementById('paginationInfo');
    const btnPrev = document.getElementById('btnPrevPage');
    const btnNext = document.getElementById('btnNextPage');
    
    if (clientes.length === 0 && currentPage === 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    info.textContent = `Página ${currentPage} de ${totalPages}`;
    
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
}

// Renderizar tabla
function renderizarTabla(data) {
    const tbody = document.getElementById('clientesBody');
    const emptyState = document.getElementById('emptyState');
    const tableContainer = document.querySelector('.table-container');
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (data.length === 0) {
        tableContainer.style.display = 'none';
        paginationContainer.style.display = 'none'; // Ocultar si no hay nada
        emptyState.style.display = 'block';
        return;
    }
    
    tableContainer.style.display = 'block';
    // paginationContainer.style.display = 'flex'; // Se maneja en actualizarControlesPaginacion
    emptyState.style.display = 'none';
    
    tbody.innerHTML = data.map(cliente => `
        <tr data-id="${cliente.id}">
            <td><strong>#${cliente.id}</strong></td>
            <td>${cliente.nombre}</td>
            <td>${cliente.telefono}</td>
            <td>${formatearFecha(cliente.fecha_registro)}</td>
            <td>${cliente.articulo}</td>
            <td>${formatearPrecio(cliente.precio)}</td>
            <td>
                <button class="btn btn-edit" onclick="editarCliente(${cliente.id})">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">
                    🗑️ Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// Buscar clientes
let timeoutBusqueda;
async function buscarClientes(e) {
    clearTimeout(timeoutBusqueda);
    const query = e.target.value.trim();
    
    if (query === '') {
        renderizarTabla(clientes);
        return;
    }
    
    timeoutBusqueda = setTimeout(async () => {
        try {
            const response = await fetch(`${API_URL}/clientes/buscar?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Error en la búsqueda');
            
            const resultados = await response.json();
            renderizarTabla(resultados);
        } catch (error) {
            console.error('Error:', error);
            mostrarToast('Error al buscar clientes', 'error');
        }
    }, 300);
}

// Abrir modal para nuevo cliente
function abrirModalNuevo() {
    editandoId = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Cliente';
    document.getElementById('formCliente').reset();
    establecerFechaActual();
    document.getElementById('modalCliente').classList.add('active');
}

// Editar cliente
async function editarCliente(id) {
    try {
        const response = await fetch(`${API_URL}/clientes/${id}`);
        if (!response.ok) throw new Error('Error al cargar cliente');
        
        const cliente = await response.json();
        
        editandoId = id;
        document.getElementById('modalTitle').textContent = 'Editar Cliente';
        document.getElementById('clienteId').value = id;
        document.getElementById('nombre').value = cliente.nombre;
        document.getElementById('telefono').value = cliente.telefono;
        document.getElementById('fechaRegistro').value = cliente.fecha_registro;
        document.getElementById('articulo').value = cliente.articulo;
        document.getElementById('precio').value = cliente.precio;
        
        document.getElementById('modalCliente').classList.add('active');
    } catch (error) {
        console.error('Error:', error);
        mostrarToast('Error al cargar el cliente', 'error');
    }
}

// Guardar cliente (crear o actualizar)
async function guardarCliente(e) {
    e.preventDefault();
    
    const data = {
        nombre: document.getElementById('nombre').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        fecha_registro: document.getElementById('fechaRegistro').value,
        articulo: document.getElementById('articulo').value.trim(),
        precio: parseFloat(document.getElementById('precio').value) || 0.00
    };
    
    try {
        let response;
        
        if (editandoId) {
            // Actualizar
            response = await fetch(`${API_URL}/clientes/${editandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Crear
            response = await fetch(`${API_URL}/clientes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        if (!response.ok) throw new Error('Error al guardar cliente');
        
        mostrarToast(
            editandoId ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente',
            'success'
        );
        
        cerrarModal();
        cargarClientes();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarToast('Error al guardar el cliente', 'error');
    }
}

// Eliminar cliente
async function eliminarCliente(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Error al eliminar cliente');
        
        mostrarToast('Cliente eliminado exitosamente', 'success');
        cargarClientes();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarToast('Error al eliminar el cliente', 'error');
    }
}

// Exportar a Excel
async function exportarExcel() {
    try {
        const response = await fetch(`${API_URL}/exportar-excel`);
        if (!response.ok) throw new Error('Error al exportar');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `clientes_${new Date().getTime()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        mostrarToast('Excel exportado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error:', error);
        mostrarToast('Error al exportar a Excel', 'error');
    }
}

// Importar desde Excel
async function importarExcel(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_URL}/importar-excel`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al importar');
        }
        
        const result = await response.json();
        mostrarToast(result.message, 'success');
        cargarClientes();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarToast(error.message || 'Error al importar Excel', 'error');
    } finally {
        e.target.value = ''; // Limpiar input
    }
}

// Descargar plantilla Excel
async function descargarPlantilla() {
    try {
        const response = await fetch(`${API_URL}/plantilla-excel`);
        if (!response.ok) throw new Error('Error al descargar plantilla');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'plantilla_clientes.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        mostrarToast('Plantilla descargada exitosamente', 'success');
        
    } catch (error) {
        console.error('Error:', error);
        mostrarToast('Error al descargar la plantilla', 'error');
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalCliente').classList.remove('active');
    document.getElementById('formCliente').reset();
    editandoId = null;
}

// Mostrar toast notification
function mostrarToast(mensaje, tipo = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = mensaje;
    toast.className = `toast ${tipo}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Establecer fecha actual en el input
function establecerFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaRegistro').value = hoy;
}

// Formatear fecha para mostrar
function formatearFecha(fecha) {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
}

// Formatear precio para mostrar
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(precio);
}
