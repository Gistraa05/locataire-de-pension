// Autentikasi Login Sederhana
function prosesLogin(event) {
    event.preventDefault();
    const pilihanRole = document.getElementById('pilihanRole').value;
    
    if (pilihanRole === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'tenant.html';
    }
}

// Navigasi Dashboard Admin
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = {
        'nav-beranda': 'admin.html', // Kita akan ambil bagian kontennya saja
        'nav-penyewa': 'manajemen user.html',
        'nav-tagihan': 'tagihan.html'
    };

    // Simpan konten asli beranda saat pertama kali dimuat
    let berandaContent = "";
    if (mainContent) {
        berandaContent = mainContent.innerHTML;
    }

    function updateActiveLink(activeId) {
        Object.keys(navLinks).forEach(id => {
            const link = document.getElementById(id);
            if (!link) return;
            if (id === activeId) {
                link.classList.add('bg-white', 'text-aksen', 'shadow-sm', 'border', 'border-pinkUtama/20');
                link.classList.remove('text-gray-500');
            } else {
                link.classList.remove('bg-white', 'text-aksen', 'shadow-sm', 'border', 'border-pinkUtama/20');
                link.classList.add('text-gray-500');
            }
        });
    }

    async function loadSection(id, url) {
        if (!mainContent) return;
        
        updateActiveLink(id);

        if (id === 'nav-beranda') {
            mainContent.innerHTML = berandaContent;
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal memuat halaman');
            const html = await response.text();
            
            // Masukkan konten ke dalam main-content
            mainContent.innerHTML = html;
        } catch (error) {
            console.error(error);
            mainContent.innerHTML = `<div class="p-10 text-center text-red-500 font-bold">Gagal memuat konten. Pastikan Anda menjalankan ini di server lokal (Live Server).</div>`;
        }
    }

    // Pasang event listener ke semua link navigasi
    Object.keys(navLinks).forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadSection(id, navLinks[id]);
            });
        }
    });
});

// Modal Control
function openModal() {
    const modal = document.getElementById('modalPenyewa');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }
}

function closeModal() {
    const modal = document.getElementById('modalPenyewa');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

function simpanPenyewa(event) {
    event.preventDefault();
    const nama = document.getElementById('namaPenyewa').value;
    const telp = document.getElementById('telpPenyewa').value;
    const kamar = document.getElementById('kamarPenyewa').value;

    if (nama && telp && kamar) {
        alert(`Berhasil! Penyewa baru telah didaftarkan:\nNama: ${nama}\nKamar: ${kamar}`);
        closeModal();
        event.target.reset(); // Reset form
    }
}

// Simulasi Verifikasi Tagihan
async function verifikasiTagihan(event) {
    event.preventDefault();
    
    // Tampilkan loading sebentar agar terasa "lancar"
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = "<i class='bx bx-loader-alt animate-spin'></i>";
    btn.disabled = true;

    setTimeout(async () => {
        try {
            const response = await fetch('tagihan2.html');
            if (!response.ok) throw new Error('Gagal memuat data baru');
            const html = await response.text();
            
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = html;
                alert("Tagihan Gistra Risky F berhasil diverifikasi!");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat verifikasi.");
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }, 800); // Simulasi delay proses 0.8 detik
}

// Simulasi Ingatkan Penyewa
let currentBellBtn = null;

function tampilPopUpIngatkan(btn) {
    currentBellBtn = btn;
    const modal = document.getElementById('modalIngatkan');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function tutupPopUpIngatkan() {
    const modal = document.getElementById('modalIngatkan');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function konfirmasiIngatkan() {
    if (currentBellBtn) {
        // Ubah icon dan style tombol agar seperti milik Budi Santoso
        currentBellBtn.classList.remove('bg-aksen', 'text-white', 'shadow-aksen/20');
        currentBellBtn.classList.add('bg-gray-100', 'text-gray-400');
        
        const icon = currentBellBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('bx-bell');
            icon.classList.add('bx-check-double');
        }

        // Tambahkan efek hover hijau seperti Budi Santoso
        currentBellBtn.classList.add('hover:bg-green-500', 'hover:text-white');
    }
    tutupPopUpIngatkan();
}

// Simulasi Unggah Bukti
function prosesUnggah(event) {
    event.preventDefault();
    const fileBukti = document.getElementById('fileBukti');
    
    if(fileBukti.files.length > 0) {
        alert("Hebat! Bukti pembayaran berhasil dikirim ke Admin.");
        fileBukti.value = ""; // Kosongkan form
    } else {
        alert("Ups! Jangan lupa pilih file (JPG/PNG/PDF) dulu ya.");
    }
}

// Modal Edit Logic
function openEditModal(nama, kamar, telp) {
    const modal = document.getElementById('modalEditPenyewa');
    if (modal) {
        document.getElementById('editNamaPenyewa').value = nama;
        document.getElementById('editKamarPenyewa').value = kamar;
        document.getElementById('editTelpPenyewa').value = telp;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeEditModal() {
    const modal = document.getElementById('modalEditPenyewa');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function simpanEditPenyewa(event) {
    event.preventDefault();
    const nama = document.getElementById('editNamaPenyewa').value;
    const telp = document.getElementById('editTelpPenyewa').value;
    const kamar = document.getElementById('editKamarPenyewa').value;

    alert(`Berhasil Memperbarui Data!\nNama: ${nama}\nTelp: ${telp}\nKamar: ${kamar}`);
    closeEditModal();
}

// Modal Delete Logic
function openDeleteModal() {
    const modal = document.getElementById('modalHapusPenyewa');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeDeleteModal() {
    const modal = document.getElementById('modalHapusPenyewa');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function konfirmasiHapusPenyewa() {
    alert("Penyewa berhasil dihapus!");
    closeDeleteModal();
    // Di sini biasanya ada logika untuk menghapus baris dari tabel
}

// Modal Cetak Logic
function openCetakModal() {
    const modal = document.getElementById('modalCetakTagihan');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeCetakModal() {
    const modal = document.getElementById('modalCetakTagihan');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function konfirmasiCetak() {
    alert("Tagihan sedang dicetak...");
    closeCetakModal();
    // Di sini biasanya ada window.print() atau logika cetak lainnya
}

// Tenant Payment Logic
function konfirmasiPembayaran() {
    const statusSpan = document.getElementById('statusPembayaran');
    if (statusSpan) {
        statusSpan.innerText = "Sudah Bayar";
        statusSpan.classList.remove('bg-aksen');
        statusSpan.classList.add('bg-green-500');
        
        alert("Terima kasih! Bukti pembayaran Anda telah dikirim dan status diperbarui menjadi 'Sudah Bayar'.");
    }
}

// Download Pop-up Logic
function tampilPopUpUnduh() {
    const modal = document.getElementById('modalUnduh');
    const content = document.getElementById('modalUnduhContent');
    if (modal && content) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('opacity-100');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }, 10);
    }
}

function tutupPopUpUnduh() {
    const modal = document.getElementById('modalUnduh');
    const content = document.getElementById('modalUnduhContent');
    if (modal && content) {
        modal.classList.remove('opacity-100');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}