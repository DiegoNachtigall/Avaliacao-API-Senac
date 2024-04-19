-- CreateTable
CREATE TABLE `cardapios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prato` VARCHAR(60) NOT NULL,
    `categoria` VARCHAR(40) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `calorias` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
