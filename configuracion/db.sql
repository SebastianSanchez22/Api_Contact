CREATE DATABASE api_contact;
USE api_contact;

CREATE TABLE IF NOT EXISTS Asesoria (
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreAsesorado VARCHAR(50) NOT NULL,
    celular BIGINT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
	plataforma VARCHAR(20) NOT NULL,
    fechaAsesoria DATE NOT NULL DEFAULT (CURRENT_DATE),
    estado VARCHAR(1));
    
CREATE TABLE IF NOT EXISTS Categoria (
	id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreCategoria VARCHAR(50) NOT NULL);
    
CREATE TABLE IF NOT EXISTS Asesor (
	id_asesor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreAsesor VARCHAR(50) NOT NULL,
    celular BIGINT NOT NULL,
    correo VARCHAR(90) NOT NULL,
    telegram_id BIGINT NOT NULL);
    
CREATE TABLE IF NOT EXISTS Asesor_Categoria (
	id_asesor INT NOT NULL,
	id_categoria INT NOT NULL,
    CONSTRAINT fk_id_asesor
    FOREIGN KEY (id_asesor)
    REFERENCES api_contact.asesor (id_asesor) 
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
	CONSTRAINT fk_id_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES api_contact.categoria (id_categoria)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    


