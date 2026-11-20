
<?php
include 'data.php';
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabel Perkalian</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }

        h2 {
            text-align: center;
        }

        table {
            border-collapse: collapse;
            margin: 30px auto;
            text-align: center;
        }

        th, td {
            border: 2px solid gray;
            padding: 10px 15px;
            font-size: 18px;
        }

        th {
            background-color: green;
            font-weight: bold;
            color: white;
        }

        .angka {
            background-color: green;
            font-weight: bold;
            color: white;
        }

        .biru {
            background-color: cyan;
        }

        .pink {
            background-color: yellow;
        }
    </style>
</head>

<body>

<h2>TABEL PERKALIAN</h2>

<table>
    <tr>
        <th>Bilangan</th>

        <?php foreach ($data as $angka) { ?>
            <th><?= $angka ?></th>
        <?php } ?>
    </tr>

    <?php foreach ($data as $baris) { ?>

    <tr>
        <td class="angka"><?= $baris ?></td>

        <?php foreach ($data as $kolom) {

            $hasil = $baris * $kolom;

            if ($hasil == 0) {
                $warna = "angka";
            } elseif ($hasil % 2 == 0) {
                $warna = "biru";
            } else {
                $warna = "pink";
            }
        ?>

            <td class="<?= $warna ?>">
                <?= $hasil ?>
            </td>

        <?php } ?>
    </tr>

    <?php } ?>

</table>

</body>
</html>
