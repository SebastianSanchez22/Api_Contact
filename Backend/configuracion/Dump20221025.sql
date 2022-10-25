CREATE DATABASE  IF NOT EXISTS `api_contact` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api_contact`;
-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: api_contact
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asesor`
--

DROP TABLE IF EXISTS `asesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesor` (
  `id_asesor` int NOT NULL AUTO_INCREMENT,
  `nombreAsesor` varchar(50) NOT NULL,
  `celular` bigint NOT NULL,
  `correo` varchar(90) NOT NULL,
  `telegram_id` bigint NOT NULL,
  PRIMARY KEY (`id_asesor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
INSERT INTO `asesor` VALUES (1,'Juan Pablo Munoz ',3042812771,'juanpmz2001@gmail.com',569939404),(2,'Juan Jose Giraldo',3204770280,'juangay@bicis.com',1203356230),(3,'Jessuar David Hoyos ',3012867971,'jesshandan@gmail.com',5795788497),(4,'Sebastian Sanchez',23456432345,'seebastian22@gmail.com',5187647590),(5,'Felipe Cano Montoya',3243564554,'Felipecano@gmail.com',1758365915);
/*!40000 ALTER TABLE `asesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesor_categoria`
--

DROP TABLE IF EXISTS `asesor_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesor_categoria` (
  `id_asesor` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_asesor`,`id_categoria`),
  KEY `fk_id_asesor` (`id_asesor`),
  KEY `fk_id_categoria` (`id_categoria`),
  CONSTRAINT `fk_id_asesor` FOREIGN KEY (`id_asesor`) REFERENCES `asesor` (`id_asesor`) ON DELETE CASCADE,
  CONSTRAINT `fk_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor_categoria`
--

LOCK TABLES `asesor_categoria` WRITE;
/*!40000 ALTER TABLE `asesor_categoria` DISABLE KEYS */;
INSERT INTO `asesor_categoria` VALUES (1,1),(1,4),(2,3),(2,4),(3,2),(3,4),(4,4),(5,4),(5,6);
/*!40000 ALTER TABLE `asesor_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesoria`
--

DROP TABLE IF EXISTS `asesoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesoria` (
  `id_asesoria` int NOT NULL AUTO_INCREMENT,
  `nombreAsesorado` varchar(50) NOT NULL,
  `celular` bigint NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `plataforma` varchar(20) NOT NULL,
  `fechaAsesoria` date NOT NULL,
  `estado` varchar(10) DEFAULT 'Pendiente',
  PRIMARY KEY (`id_asesoria`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesoria`
--

LOCK TABLES `asesoria` WRITE;
/*!40000 ALTER TABLE `asesoria` DISABLE KEYS */;
INSERT INTO `asesoria` VALUES (1,'NombrePrueba',3123456789,'Vehiculos','Whatsapp','2022-12-20','Pendiente'),(2,'NombrePrueba2',3123456789,'Televisores','Whatsapp','2022-12-20','Pendiente'),(3,'NombrePrueba2',3123456789,'Computadores','Whatsapp','2022-12-20','Pendiente'),(4,'NombrePrueba2',3123456789,'Deportes','Whatsapp','2022-12-23','Pendiente'),(5,'NombrePrueba3',3123456789,'Celulares','Whatsapp','2022-12-23','Pendiente'),(6,'NombrePrueba4',3987654321,'Bicicletas','hamster','2022-12-23','Pendiente'),(7,'NombrePrueba5',3987654321,'Medias','WhatsApp','2022-12-23','Pendiente'),(8,'Prueba1',3103993399,'Televisores','Llamada','2022-10-25','Pendiente'),(9,'Prueba2',3103993399,'Televisores','Llamada','2022-10-25','Pendiente'),(10,'Prueba2',3103993399,'Computadores','Llamada','2022-10-25','Pendiente'),(11,'Prueba2',3103993399,'Bicicletas','Llamada','2022-10-26','Pendiente'),(12,'Prueba3',3103993399,'Computadores','Llamada','2022-11-20','Pendiente'),(13,'Juan Jose Giraldo',3115436594,'Deportes','WhatsApp','2022-10-17','Pendiente'),(14,'Ju',3115436594,'Vehiculos','WhatsApp','2022-10-17','Pendiente'),(15,'Juan Pablo Muñoz',3116326593,'Computadores','WhatsApp','2022-12-28','Pendiente'),(16,'sdvdfbsfbc',123142342342,'Drogas','WhatsApp','2022-10-12','Pendiente');
/*!40000 ALTER TABLE `asesoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Vehiculos'),(2,'Televisores'),(3,'Bicicletas'),(4,'Computadores'),(5,'Celulares'),(6,'Deportes');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-25 15:21:16
