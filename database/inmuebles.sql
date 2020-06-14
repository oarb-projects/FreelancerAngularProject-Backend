-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: inmuebles
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COMPANIA`
--

DROP TABLE IF EXISTS `COMPANIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPANIA` (
  `com_id` int(11) NOT NULL AUTO_INCREMENT,
  `com_nombre` varchar(255) DEFAULT NULL,
  `com_activo` int(45) DEFAULT NULL,
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPANIA`
--

LOCK TABLES `COMPANIA` WRITE;
/*!40000 ALTER TABLE `COMPANIA` DISABLE KEYS */;
INSERT INTO `COMPANIA` VALUES (1,'Axial',1);
/*!40000 ALTER TABLE `COMPANIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPANIA_PROPIEDAD`
--

DROP TABLE IF EXISTS `COMPANIA_PROPIEDAD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPANIA_PROPIEDAD` (
  `cop_id` int(11) NOT NULL AUTO_INCREMENT,
  `cop_compania` int(11) NOT NULL,
  `cop_propiedad` int(11) NOT NULL,
  PRIMARY KEY (`cop_id`),
  KEY `FK_COMPANIA_COMPANIA_PROPIEDAD_idx` (`cop_compania`),
  KEY `FK_PROPIEDAD_COMPANIA_PROPIEDAD_idx` (`cop_propiedad`),
  CONSTRAINT `FK_COMPANIA_COMPANIA_PROPIEDAD` FOREIGN KEY (`cop_compania`) REFERENCES `COMPANIA` (`com_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_PROPIEDAD_COMPANIA_PROPIEDAD` FOREIGN KEY (`cop_propiedad`) REFERENCES `PROPIEDAD` (`pro_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPANIA_PROPIEDAD`
--

LOCK TABLES `COMPANIA_PROPIEDAD` WRITE;
/*!40000 ALTER TABLE `COMPANIA_PROPIEDAD` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMPANIA_PROPIEDAD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPANIA_USUARIO`
--

DROP TABLE IF EXISTS `COMPANIA_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPANIA_USUARIO` (
  `cou_id` int(11) NOT NULL AUTO_INCREMENT,
  `cou_id_compania` int(11) NOT NULL,
  `cou_id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`cou_id`),
  KEY `FK_COMPANIA_USUARIO_COMPANIA_idx` (`cou_id_compania`),
  KEY `FK_COMPANIA_USUARIO_USUARIO_idx` (`cou_id_usuario`),
  CONSTRAINT `FK_COMPANIA_USUARIO_COMPANIA` FOREIGN KEY (`cou_id_compania`) REFERENCES `COMPANIA` (`com_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_COMPANIA_USUARIO_USUARIO` FOREIGN KEY (`cou_id_usuario`) REFERENCES `USUARIO` (`usu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPANIA_USUARIO`
--

LOCK TABLES `COMPANIA_USUARIO` WRITE;
/*!40000 ALTER TABLE `COMPANIA_USUARIO` DISABLE KEYS */;
INSERT INTO `COMPANIA_USUARIO` VALUES (1,1,1);
/*!40000 ALTER TABLE `COMPANIA_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_ALTA_PROPIEDAD`
--

DROP TABLE IF EXISTS `DETALLE_ALTA_PROPIEDAD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DETALLE_ALTA_PROPIEDAD` (
  `dap_id` int(11) NOT NULL AUTO_INCREMENT,
  `dap_id_compania_propiedad` int(11) NOT NULL,
  `dap_id_usuario` int(11) NOT NULL,
  `dap_fecha` datetime NOT NULL,
  PRIMARY KEY (`dap_id`),
  KEY `FK_COMPANIA_PROPIEDAD_DETALLE_ALTA_PROPIEDAD_idx` (`dap_id_compania_propiedad`),
  KEY `FK_USUARIO_DETALLE_ALTA_PROPIEDAD_idx` (`dap_id_usuario`),
  CONSTRAINT `FK_COMPANIA_PROPIEDAD_DETALLE_ALTA_PROPIEDAD` FOREIGN KEY (`dap_id_compania_propiedad`) REFERENCES `COMPANIA_PROPIEDAD` (`cop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_USUARIO_DETALLE_ALTA_PROPIEDAD` FOREIGN KEY (`dap_id_usuario`) REFERENCES `USUARIO` (`usu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_ALTA_PROPIEDAD`
--

LOCK TABLES `DETALLE_ALTA_PROPIEDAD` WRITE;
/*!40000 ALTER TABLE `DETALLE_ALTA_PROPIEDAD` DISABLE KEYS */;
/*!40000 ALTER TABLE `DETALLE_ALTA_PROPIEDAD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_ALTA_USUARIO`
--

DROP TABLE IF EXISTS `DETALLE_ALTA_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DETALLE_ALTA_USUARIO` (
  `dau_id` int(11) NOT NULL AUTO_INCREMENT,
  `dau_compania_usuario` int(11) NOT NULL,
  `dau_usuario` int(11) NOT NULL,
  `dau_fecha` datetime NOT NULL,
  PRIMARY KEY (`dau_id`),
  KEY `FK_COMPANIA_USUARIO_DETALLE_ALTA_USUARIO_idx` (`dau_compania_usuario`),
  KEY `FK_USUARIO_DETALLE_ALTA_USUARIO_idx` (`dau_usuario`),
  CONSTRAINT `FK_COMPANIA_USUARIO_DETALLE_ALTA_USUARIO` FOREIGN KEY (`dau_compania_usuario`) REFERENCES `COMPANIA_USUARIO` (`cou_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_USUARIO_DETALLE_ALTA_USUARIO` FOREIGN KEY (`dau_usuario`) REFERENCES `USUARIO` (`usu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_ALTA_USUARIO`
--

LOCK TABLES `DETALLE_ALTA_USUARIO` WRITE;
/*!40000 ALTER TABLE `DETALLE_ALTA_USUARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `DETALLE_ALTA_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_BAJA_PROPIEDAD`
--

DROP TABLE IF EXISTS `DETALLE_BAJA_PROPIEDAD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DETALLE_BAJA_PROPIEDAD` (
  `dbp_id` int(11) NOT NULL AUTO_INCREMENT,
  `dbp_id_compania_propiedad` int(11) NOT NULL,
  `dbp_usuario` int(11) NOT NULL,
  `dbp_fecha` datetime NOT NULL,
  PRIMARY KEY (`dbp_id`),
  KEY `FK_COMPANIA_PROPIEDAD_DETALLE_BAJA_PROPIEDAD_idx` (`dbp_id_compania_propiedad`),
  KEY `FK_USUARIO_DETALLE_BAJA_PROPIEDAD_idx` (`dbp_usuario`),
  CONSTRAINT `FK_COMPANIA_PROPIEDAD_DETALLE_BAJA_PROPIEDAD` FOREIGN KEY (`dbp_id_compania_propiedad`) REFERENCES `COMPANIA_PROPIEDAD` (`cop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_USUARIO_DETALLE_BAJA_PROPIEDAD` FOREIGN KEY (`dbp_usuario`) REFERENCES `USUARIO` (`usu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_BAJA_PROPIEDAD`
--

LOCK TABLES `DETALLE_BAJA_PROPIEDAD` WRITE;
/*!40000 ALTER TABLE `DETALLE_BAJA_PROPIEDAD` DISABLE KEYS */;
/*!40000 ALTER TABLE `DETALLE_BAJA_PROPIEDAD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_BAJA_USUARIO`
--

DROP TABLE IF EXISTS `DETALLE_BAJA_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DETALLE_BAJA_USUARIO` (
  `dbu_id` int(11) NOT NULL AUTO_INCREMENT,
  `dbu_id_compania_usuario` int(11) NOT NULL,
  `dbu_id_usuario` int(11) NOT NULL,
  `dbu_fecha` datetime NOT NULL,
  PRIMARY KEY (`dbu_id`),
  KEY `FK_COMPANIA_USUARIO_DETALLE_BAJA_USUARIO_idx` (`dbu_id_compania_usuario`),
  KEY `FK_USUARIO_DETALLE_BAJA_USUARIO_idx` (`dbu_id_usuario`),
  CONSTRAINT `FK_COMPANIA_USUARIO_DETALLE_BAJA_USUARIO` FOREIGN KEY (`dbu_id_compania_usuario`) REFERENCES `COMPANIA_USUARIO` (`cou_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_USUARIO_DETALLE_BAJA_USUARIO` FOREIGN KEY (`dbu_id_usuario`) REFERENCES `USUARIO` (`usu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_BAJA_USUARIO`
--

LOCK TABLES `DETALLE_BAJA_USUARIO` WRITE;
/*!40000 ALTER TABLE `DETALLE_BAJA_USUARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `DETALLE_BAJA_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROPIEDAD`
--

DROP TABLE IF EXISTS `PROPIEDAD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPIEDAD` (
  `pro_id` int(11) NOT NULL AUTO_INCREMENT,
  `pro_id_tipo_propiedad` int(11) NOT NULL,
  `pro_id_tipo_negocio` int(11) NOT NULL,
  `pro_tag` varchar(100) DEFAULT NULL,
  `pro_ubicacion` varchar(255) DEFAULT NULL,
  `pro_direccion` varchar(255) DEFAULT NULL,
  `pro_descripcion` text DEFAULT NULL,
  `pro_cantidad_recamaras` int(11) DEFAULT NULL,
  `pro_cantidad_banios` int(11) DEFAULT NULL,
  `pro_cantidad_pisos` int(11) DEFAULT NULL,
  `pro_cantidad_autos` int(11) DEFAULT NULL,
  `pro_cuarto_lavado` int(11) DEFAULT NULL,
  `pro_amueblado` int(11) DEFAULT NULL,
  `pro_closet` int(11) DEFAULT NULL,
  `pro_dimensiones_frente` double DEFAULT NULL,
  `pro_dimensiones_fondo` double DEFAULT NULL,
  `pro_precio` float DEFAULT NULL,
  `pro_aire_acondicionado` int(11) DEFAULT NULL,
  `pro_referencias` text DEFAULT NULL,
  `pro_jardin` int(11) DEFAULT NULL,
  `pro_nueva` int(11) DEFAULT NULL,
  `pro_activo` int(11) DEFAULT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `FK_TIPO_NEGOCIO_PROPIEDAD_idx` (`pro_id_tipo_negocio`),
  KEY `FK_TIPO_PROPIEDAD_PROPIEDAD_idx` (`pro_id_tipo_propiedad`),
  CONSTRAINT `FK_TIPO_NEGOCIO_PROPIEDAD` FOREIGN KEY (`pro_id_tipo_negocio`) REFERENCES `TIPO_NEGOCIO` (`tin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_TIPO_PROPIEDAD_PROPIEDAD` FOREIGN KEY (`pro_id_tipo_propiedad`) REFERENCES `TIPO_PROPIEDAD` (`tip_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROPIEDAD`
--

LOCK TABLES `PROPIEDAD` WRITE;
/*!40000 ALTER TABLE `PROPIEDAD` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROPIEDAD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROPIEDAD_IMAGEN`
--

DROP TABLE IF EXISTS `PROPIEDAD_IMAGEN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPIEDAD_IMAGEN` (
  `pri_id` int(11) NOT NULL AUTO_INCREMENT,
  `pri_id_propiedad` int(11) NOT NULL,
  `pro_ruta_imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`pri_id`),
  KEY `FK_PROPIEDAD_PROPIEDAD_IMAGEN_idx` (`pri_id_propiedad`),
  CONSTRAINT `FK_PROPIEDAD_PROPIEDAD_IMAGEN` FOREIGN KEY (`pri_id_propiedad`) REFERENCES `PROPIEDAD` (`pro_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROPIEDAD_IMAGEN`
--

LOCK TABLES `PROPIEDAD_IMAGEN` WRITE;
/*!40000 ALTER TABLE `PROPIEDAD_IMAGEN` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROPIEDAD_IMAGEN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PUBLICACION`
--

DROP TABLE IF EXISTS `PUBLICACION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PUBLICACION` (
  `pub_id` int(11) NOT NULL AUTO_INCREMENT,
  `pub_id_usuario` int(11) NOT NULL,
  `pub_id_propiedad` int(11) NOT NULL,
  `pub_fecha` datetime NOT NULL,
  `pub_activo` int(11) DEFAULT NULL,
  PRIMARY KEY (`pub_id`),
  KEY `FK_USUARIO_PUBLICACION_idx` (`pub_id_usuario`),
  KEY `FK_PROPIEDAD_PUBLICACION_idx` (`pub_id_propiedad`),
  CONSTRAINT `FK_PROPIEDAD_PUBLICACION` FOREIGN KEY (`pub_id_propiedad`) REFERENCES `PROPIEDAD` (`pro_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_USUARIO_PUBLICACION` FOREIGN KEY (`pub_id_usuario`) REFERENCES `USUARIO` (`usu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PUBLICACION`
--

LOCK TABLES `PUBLICACION` WRITE;
/*!40000 ALTER TABLE `PUBLICACION` DISABLE KEYS */;
/*!40000 ALTER TABLE `PUBLICACION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROL`
--

DROP TABLE IF EXISTS `ROL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROL` (
  `rol_id` int(11) NOT NULL,
  `rol_descripcion` varchar(45) NOT NULL,
  `rol_activo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROL`
--

LOCK TABLES `ROL` WRITE;
/*!40000 ALTER TABLE `ROL` DISABLE KEYS */;
INSERT INTO `ROL` VALUES (1,'Administrador',1),(2,'Vendedor',1);
/*!40000 ALTER TABLE `ROL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIPO_NEGOCIO`
--

DROP TABLE IF EXISTS `TIPO_NEGOCIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TIPO_NEGOCIO` (
  `tin_id` int(11) NOT NULL AUTO_INCREMENT,
  `tin_descripcion` varchar(45) NOT NULL,
  `tin_activo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`tin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIPO_NEGOCIO`
--

LOCK TABLES `TIPO_NEGOCIO` WRITE;
/*!40000 ALTER TABLE `TIPO_NEGOCIO` DISABLE KEYS */;
INSERT INTO `TIPO_NEGOCIO` VALUES (1,'Venta',1),(2,'Renta',1);
/*!40000 ALTER TABLE `TIPO_NEGOCIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIPO_PROPIEDAD`
--

DROP TABLE IF EXISTS `TIPO_PROPIEDAD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TIPO_PROPIEDAD` (
  `tip_id` int(11) NOT NULL AUTO_INCREMENT,
  `tip_descripcion` varchar(45) NOT NULL,
  `tip_activo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`tip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIPO_PROPIEDAD`
--

LOCK TABLES `TIPO_PROPIEDAD` WRITE;
/*!40000 ALTER TABLE `TIPO_PROPIEDAD` DISABLE KEYS */;
INSERT INTO `TIPO_PROPIEDAD` VALUES (1,'Casa',1),(2,'Departamento',1),(3,'Terreno',1),(4,'Local comercial',1),(5,'Nave industrial',1);
/*!40000 ALTER TABLE `TIPO_PROPIEDAD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USUARIO` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(45) NOT NULL,
  `usu_apellido` varchar(45) NOT NULL,
  `usu_correo` varchar(255) NOT NULL,
  `usu_password` longtext NOT NULL,
  `usu_fecha_nacimiento` datetime DEFAULT NULL,
  `usu_telefono_personal` varchar(15) DEFAULT NULL,
  `usu_telefono_oficina` varchar(15) DEFAULT NULL,
  `usu_pagina_web` varchar(255) DEFAULT NULL,
  `usu_id_rol` int(11) DEFAULT NULL,
  `usu_activo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`usu_id`),
  KEY `FK_ROL_USUARIO_idx` (`usu_id_rol`),
  CONSTRAINT `FK_ROL_USUARIO` FOREIGN KEY (`usu_id_rol`) REFERENCES `ROL` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'Hector','Garcia','rotceh.1203@gmail.com','$2b$10$sM9wOrTuIPPAaEor1mG85eXJyVdmozA3g11V754a8zFAfV.PndQ5m','1991-03-12 00:00:00','6862884009','6862884009','www.pagina.com',1,1);
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-18  8:23:58
