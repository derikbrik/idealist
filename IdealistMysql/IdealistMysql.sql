-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.21 - MySQL Community Server (GPL)
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela idealist.tblestabelecimentos
CREATE TABLE IF NOT EXISTS `tblestabelecimentos` (
  `idEstabelecimento` int(11) NOT NULL AUTO_INCREMENT,
  `EstabDescricao` varchar(50) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`idEstabelecimento`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela idealist.tblestabelecimentos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tblestabelecimentos` DISABLE KEYS */;
INSERT INTO `tblestabelecimentos` (`idEstabelecimento`, `EstabDescricao`) VALUES
	(1, 'Pão De açucar'),
	(2, 'Carrefour'),
	(3, 'Mercadinho do Zé');
/*!40000 ALTER TABLE `tblestabelecimentos` ENABLE KEYS */;


-- Copiando estrutura para tabela idealist.tbllistaprodutos
CREATE TABLE IF NOT EXISTS `tbllistaprodutos` (
  `idListaProdutos` int(11) NOT NULL AUTO_INCREMENT,
  `idfProduto` int(11) NOT NULL,
  `idfLista` int(11) NOT NULL,
  PRIMARY KEY (`idListaProdutos`),
  KEY `fk_ListaProdutos_Listas` (`idfLista`),
  KEY `fk_ListaProdutos_Produtos` (`idfProduto`),
  CONSTRAINT `fk_ListaProdutos_Listas` FOREIGN KEY (`idfLista`) REFERENCES `tbllistas` (`idLista`),
  CONSTRAINT `fk_ListaProdutos_Produtos` FOREIGN KEY (`idfProduto`) REFERENCES `tblprodutos` (`idProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela idealist.tbllistaprodutos: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `tbllistaprodutos` DISABLE KEYS */;
INSERT INTO `tbllistaprodutos` (`idListaProdutos`, `idfProduto`, `idfLista`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 1, 2);
/*!40000 ALTER TABLE `tbllistaprodutos` ENABLE KEYS */;


-- Copiando estrutura para tabela idealist.tbllistas
CREATE TABLE IF NOT EXISTS `tbllistas` (
  `idLista` int(11) NOT NULL AUTO_INCREMENT,
  `ListaDescricao` varchar(50) COLLATE latin1_general_ci NOT NULL DEFAULT '0',
  `ListaDataCriacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idLista`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela idealist.tbllistas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tbllistas` DISABLE KEYS */;
INSERT INTO `tbllistas` (`idLista`, `ListaDescricao`, `ListaDataCriacao`) VALUES
	(1, 'Churrasco FDS', '2015-10-06 08:47:41'),
	(2, 'Compras da Semana', '2015-10-06 08:47:48');
/*!40000 ALTER TABLE `tbllistas` ENABLE KEYS */;


-- Copiando estrutura para tabela idealist.tblprodutos
CREATE TABLE IF NOT EXISTS `tblprodutos` (
  `idProduto` int(11) NOT NULL AUTO_INCREMENT,
  `ProdDescricao` varchar(50) COLLATE latin1_general_ci NOT NULL DEFAULT '0',
  `ProdUnidade` varchar(3) COLLATE latin1_general_ci NOT NULL DEFAULT '0',
  `ProdCodigoDeBarras` varchar(15) COLLATE latin1_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`idProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela idealist.tblprodutos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tblprodutos` DISABLE KEYS */;
INSERT INTO `tblprodutos` (`idProduto`, `ProdDescricao`, `ProdUnidade`, `ProdCodigoDeBarras`) VALUES
	(1, 'Batata Inglesa', 'kg', '7891253207383'),
	(2, 'Caderno Tilibra', 'PC', '9788575221068');
/*!40000 ALTER TABLE `tblprodutos` ENABLE KEYS */;


-- Copiando estrutura para tabela idealist.tblregistrosdeprecos
CREATE TABLE IF NOT EXISTS `tblregistrosdeprecos` (
  `idRegistrosDePrecos` int(11) NOT NULL AUTO_INCREMENT,
  `RgpPreco` double NOT NULL DEFAULT '0',
  `RgpDataDeRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idfEstabelecimento` int(11) NOT NULL,
  `idfListaProduto` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idRegistrosDePrecos`),
  KEY `fk_RegistroDePrecos_Estabelecimento` (`idfEstabelecimento`),
  KEY `fk_RegistroDePrecos_ListaProdutos` (`idfListaProduto`),
  CONSTRAINT `fk_RegistroDePrecos_Estabelecimento` FOREIGN KEY (`idfEstabelecimento`) REFERENCES `tblestabelecimentos` (`idEstabelecimento`),
  CONSTRAINT `fk_RegistroDePrecos_ListaProdutos` FOREIGN KEY (`idfListaProduto`) REFERENCES `tbllistaprodutos` (`idListaProdutos`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela idealist.tblregistrosdeprecos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tblregistrosdeprecos` DISABLE KEYS */;
INSERT INTO `tblregistrosdeprecos` (`idRegistrosDePrecos`, `RgpPreco`, `RgpDataDeRegistro`, `idfEstabelecimento`, `idfListaProduto`) VALUES
	(1, 100, '2015-10-06 09:47:51', 1, 1);
/*!40000 ALTER TABLE `tblregistrosdeprecos` ENABLE KEYS */;


-- Copiando estrutura para tabela idealist.tblusers
CREATE TABLE IF NOT EXISTS `tblusers` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE latin1_general_ci DEFAULT '0',
  `username` varchar(50) COLLATE latin1_general_ci NOT NULL DEFAULT '0',
  `password` varchar(15) COLLATE latin1_general_ci DEFAULT '0',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela idealist.tblusers: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tblusers` DISABLE KEYS */;
INSERT INTO `tblusers` (`idUser`, `email`, `username`, `password`) VALUES
	(1, 'derikbrik@hotmail.com', 'joao', '123'),
	(7, 'derikbrik@spp.com.br', 'jack', '1234567');
/*!40000 ALTER TABLE `tblusers` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
