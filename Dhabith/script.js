
$(document).ready(function () {

    const produk = [
        { id: 1, nama: "Laptop", harga: 5000000, stok: 5, gambar: "💻" },
        { id: 2, nama: "Handphone", harga: 3000000, stok: 5, gambar: "📱" },
        { id: 3, nama: "Headphone", harga: 250000, stok: 5, gambar: "🎧" },
        { id: 4, nama: "Keyboard", harga: 150000, stok: 5, gambar: "⌨️" },
        { id: 5, nama: "Mouse", harga: 100000, stok: 5, gambar: "🖱️" },
        { id: 6, nama: "Smartwatch", harga: 750000, stok: 5, gambar: "⌚" }
    ];
    let keranjang = [];
    function rupiah(angka) {
        return angka.toLocaleString("id-ID");
    }

    function tampilkanProduk() {
        let daftar = document.getElementById("daftarProduk");
        daftar.innerHTML = "";

        produk.forEach(function (item) {
            let card = document.createElement("div");
            card.className = "produk";
            let gambar = document.createElement("div");
            gambar.className = "gambar";
            gambar.appendChild(document.createTextNode(item.gambar));
            let nama = document.createElement("h3");
            nama.appendChild(document.createTextNode(item.nama));
            let harga = document.createElement("p");
            harga.appendChild(
                document.createTextNode("Harga: Rp " + rupiah(item.harga))
            );
            let stok = document.createElement("p");
            stok.appendChild(
                document.createTextNode("Stok: " + item.stok)
            );
            let tombol = document.createElement("button");
            tombol.appendChild(
                document.createTextNode(
                    item.stok > 0 ? "Tambah ke Keranjang" : "Stok Habis"
                )
            );
            tombol.disabled = item.stok <= 0;
            tombol.onclick = function () {
                tambahKeranjang(item.id);
            };
            card.appendChild(gambar);
            card.appendChild(nama);
            card.appendChild(harga);
            card.appendChild(stok);
            card.appendChild(tombol);
            daftar.appendChild(card);
        });
        cariProduk();
    }

    function tambahKeranjang(id) {
        let barang = produk.find(function (p) {
            return p.id === id;
        });
        if (!barang || barang.stok <= 0) {
            alert("Maaf, stok produk habis!");
            return;
        }
        barang.stok--;

        let item = keranjang.find(function (p) {
            return p.id === id;
        });

        if (item) {
            item.jumlah++;
        } else {
            keranjang.push({
                id: barang.id,
                nama: barang.nama,
                harga: barang.harga,
                jumlah: 1
            });
        }
        tampilkanProduk();
        tampilkanKeranjang();
        $("#isiKeranjang").fadeIn(500);
    }

    function tampilkanKeranjang() {
        $("#isiKeranjang").empty();
        let total = 0;
        let jumlah = 0;
        if (keranjang.length === 0) {
            $("#isiKeranjang").text("Keranjang masih kosong.");
        }

        keranjang.forEach(function (item) {
            let subtotal = item.harga * item.jumlah;
            total += subtotal;
            jumlah += item.jumlah;
            let baris = $("<div>").addClass("item-keranjang");
            let keterangan = $("<span>").text(
                item.nama + " x " + item.jumlah +
                " = Rp " + rupiah(subtotal)
            );
            let tombolHapus = $("<button>").text("Hapus");
            tombolHapus.on("click", function () {
                hapusItem(item.id, baris);
            });
            baris.append(keterangan);
            baris.append(tombolHapus);
            $("#isiKeranjang").append(baris);
            baris.hide().fadeIn(500);
        });
        $("#jumlahItem").text(jumlah);
        $("#totalHarga").text(rupiah(total));
    }

    function hapusItem(id, baris) {
        if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) {
            return;
        }
        let item = keranjang.find(function (p) {
            return p.id === id;
        });

        if (item) {
            let barang = produk.find(function (p) {
                return p.id === id;
            });
            barang.stok += item.jumlah;
            baris.fadeOut(400, function () {
                $(this).remove();
                keranjang = keranjang.filter(function (p) {
                    return p.id !== id;
                });
                tampilkanProduk();
                tampilkanKeranjang();
            });
        }
    }

    $("#kosongkan").click(function () {
        if (keranjang.length === 0) {
            alert("Keranjang sudah kosong!");
            return;
        }
        if (confirm("Yakin ingin mengosongkan keranjang?")) {
            keranjang.forEach(function (item) {
                let barang = produk.find(function (p) {
                    return p.id === item.id;
                });
                barang.stok += item.jumlah;
            });
            $("#isiKeranjang").fadeOut(400, function () {
                keranjang = [];
                $("#isiKeranjang").empty();
                tampilkanProduk();
                tampilkanKeranjang();
                $("#isiKeranjang").fadeIn(400);
            });
        }
    });

    $("#tombolKeranjang").click(function () {

        $("#panelKeranjang").animate(
            {
                height: "toggle",
                opacity: "toggle"
            },
            500
        );
    });

    function cariProduk() {
        let kataKunci = $("#cari").val().toLowerCase();
        $(".produk").each(function () {
            let namaProduk = $(this).find("h3").text().toLowerCase();
            $(this).toggle(namaProduk.includes(kataKunci));
        });
    }

    $("#tombolCari").click(function () {
        cariProduk();
    });

    $("#cari").on("keyup", function () {
        cariProduk();
    });
    $("#checkout").click(function () {
        if (keranjang.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }
        let namaPembeli = prompt("Masukkan nama pembeli:");
        if (namaPembeli === null) {
            return;
        }
        namaPembeli = namaPembeli.trim();
        if (namaPembeli === "") {
            alert("Nama pembeli tidak boleh kosong!");
            return;
        }
        let total = 0;
        let jumlah = 0;
        let daftarPesanan = "";
        keranjang.forEach(function (item) {

            let subtotal = item.harga * item.jumlah;

            total += subtotal;
            jumlah += item.jumlah;

            daftarPesanan +=
                "<p>" +
                $("<div>").text(item.nama).html() +
                " x " + item.jumlah +
                " = Rp " + rupiah(subtotal) +
                "</p>";
        });

        $("#ringkasan").html(
            "<h2>Ringkasan Pesanan</h2>" +
            "<p>Nama Pembeli: " +
            $("<div>").text(namaPembeli).html() +
            "</p>" +
            "<p>Daftar Pesanan:</p>" +
            daftarPesanan +
            "<hr>" +
            "<p>Jumlah Item: " + jumlah + "</p>" +
            "<h3>Total Harga: Rp " + rupiah(total) + "</h3>"
        );
        $("#ringkasan").fadeIn(500);
        keranjang = [];
        tampilkanKeranjang();
    });
    tampilkanProduk();
    tampilkanKeranjang();

});
