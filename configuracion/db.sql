CREATE DATABASE api_contact;

USE api_contact;

CREATE TABLE IF NOT EXISTS Usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(50) NOT NULL,
    telefono_usuario INT NOT NULL);
    
CREATE TABLE IF NOT EXISTS Categoria (
	id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL);
    
CREATE TABLE IF NOT EXISTS Asesor (
	id_asesor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_asesor VARCHAR(50) NOT NULL,
    telefono_asesor INT NOT NULL,
    telegram_id INT NULL);
    
CREATE TABLE IF NOT EXISTS Asesor_Categoria (
	id_categoria INT NOT NULL,
    id_asesor INT NOT NULL,
    CONSTRAINT fk_id_Categoria_Asesor
    FOREIGN KEY (id_categoria)
    REFERENCES api_contact.categoria (id_categoria) 
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
	CONSTRAINT fk_id_Asesor_Categoria
    FOREIGN KEY (id_asesor)
    REFERENCES api_contact.asesor (id_asesor)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS Asesorias (
	id_asesor INT NOT NULL,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    fecha_solicitud DATE NOT NULL,
    fecha_asesoria DATE NOT NULL,
    estado VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_asesor, id_usuario),
    CONSTRAINT fk_id_Asesorias_Asesor
    FOREIGN KEY (id_asesor)
    REFERENCES api_contact.asesor (id_asesor) 
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
	CONSTRAINT fk_id_Asesorias_Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES api_contact.usuario (id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT fk_id_Asesorias_Categoria
    FOREIGN KEY (id_categoria)
    REFERENCES api_contact.categoria (id_categoria) 
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
