-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: businesses
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

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
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business` (
  `id` varchar(255) NOT NULL,
  `alias` longtext NOT NULL,
  `name` longtext NOT NULL,
  `image_url` longtext DEFAULT NULL,
  `is_closed` int(1) NOT NULL,
  `url` longtext DEFAULT NULL,
  `review_count` bigint(50) NOT NULL,
  `categories` longtext DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `transactions` longtext DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `address1` longtext DEFAULT NULL,
  `address2` longtext DEFAULT NULL,
  `address3` longtext DEFAULT NULL,
  `city` longtext DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `country` longtext NOT NULL,
  `state` longtext DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `display_phone` varchar(30) NOT NULL,
  `distance` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES ('1c0d1eb1fde58fe84519ab31eab11d7e006da2bfc12ccd93be25ab0069861bf9','asadas','asadas','http://localhost:5000/img/1704686903143.jpg',0,'asadas',456,'[{\"alias\":\"as\",\"title\":\"as\"},{\"alias\":\"\",\"title\":\"\"}]',654,'654','64','[\"restaurant_reservation\",\"pickup\"]','$$','as','asad','asas','asdas','10460','Indonesia','ID','0213101152','0231316564',5.465468789756313e15),('fc5a7504de311de9acbb5b35c81dc8b983b6ffc0598e6edd66bf22f79b9ecca8','asd-2','asd','http://localhost:5000/img/1704686262782.jpeg',1,'asd',0,'[{\"alias\":\"das\",\"title\":\"das\"}]',456,'4564','-788.123214','[\"restaurant_reservation\"]','$','ini adala jalan','ini addr 2','addr 3','jakarta ','10460','indonesia','ID','02131001152','0216164647697',456487961231);
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-08 18:35:03
