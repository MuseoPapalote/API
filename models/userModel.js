const {db} = require('../database/db');

async function getUserInfo(userId){
    try{
        const visitasQuery = 'SELECT e.nombre_exposicion, v.fecha_hora_visita FROM visita v JOIN exposicion e ON v.id_exposicion = e.id_exposicion WHERE v.id_usuario = $1 ORDER BY v.fecha_hora_visita DESC;';
        const {rows: visitas} = await db.query(visitasQuery, [userId]);


        const query = 'SELECT nombre,email,fecha_nacimiento FROM usuario WHERE id_usuario = $1';
        const {rows} = await db.query(query, [userId]);
        return {...rows[0], visitas};
    } catch(error){
        console.error('Error al obtener la informacion del usuario:', error);
        throw error;
    }
}

async function findUserByEmail(email){
    try{
        const query = 'SELECT * FROM usuario WHERE email = $1';
        const {rows} = await db.query(query, [email]);
        return rows[0];
    } catch(error){
        console.error('Error al buscar usuario por email:', error);
        throw error;
    }
}

async function createUser({nombre, email, password, fecha_nacimiento}){
    try{
        const query = 'INSERT INTO usuario (nombre, email, password, fecha_nacimiento) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email;';
        const {rows} = await db.query(query, [nombre, email, password, fecha_nacimiento]);
        return rows[0];
    } catch (error){
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

async function createAdminUser(nombre,email,password,rol){
    try{
        const query = 'INSERT INTO usuario (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *;';
        const {rows} = await db.query(query, [nombre, email, password,rol]);
        return rows[0];
    } catch (error){
        console.error('Error al crear usuario admin:', error);
        throw error;
    }
}

async function createProgressForuser(id_usuario){
    try{
        const zonasQuery = 'SELECT * FROM zona;';
        const {rows: zonas} = await db.query(zonasQuery);
        for (let zona of zonas){
            const totalExposicionesQuery = 'SELECT COUNT(*) FROM exposicion WHERE id_zona = $1;';
            const {rows: totalExposiciones} = await db.query(totalExposicionesQuery, [zona.id_zona]);

            const insertProgressQuery = 'INSERT INTO progresozona (id_usuario, id_zona, exposiciones_visitadas,total_exposiciones,porcentaje_avance) VALUES ($1, $2, $3, $4, $5);';

            await db.query(insertProgressQuery, [id_usuario, zona.id_zona, 0, totalExposiciones[0].count, 0.0]);
        }
    }catch(error){
        console.error('Error al crear progreso para el usuario:', error);
        throw error;
    }
}

async function findUserByGoogleId(google_id){
    try{
        const query = 'SELECT * FROM usuario WHERE google_id = $1';
        const {rows} = await db.query(query, [google_id]);
        return rows[0];
    } catch(error){
        console.error('Error al buscar usuario por google_id:', error);
        throw error;
    }
}

async function createUserByGoogle({nombre, email, google_id}){
    try{
        const query = 'INSERT INTO usuario (nombre, email, google_id) VALUES ($1, $2, $3) RETURNING id_usuario, nombre, email;';
        const {rows} = await db.query(query, [nombre, email, google_id]);
        return rows[0];
    } catch (error){
        console.error('Error al crear usuario con Google:', error);
        throw error;
    }
}

async function findUserByFacebookId(facebook_id){
    try{
        const query = 'SELECT * FROM usuario WHERE facebook_id = $1';
        const {rows} = await db.query(query, [facebook_id]);
        return rows[0];
    } catch(error){
        console.error('Error al buscar usuario por facebook_id:', error);
        throw error;
    }
}

async function createUserByFacebook({nombre, email, facebook_id}){
    try{
        const query = 'INSERT INTO usuario (nombre, email, facebook_id) VALUES ($1, $2, $3) RETURNING id_usuario, nombre, email;';
        const {rows} = await db.query(query, [nombre, email, facebook_id]);
        return rows[0];
    } catch (error){
        console.error('Error al crear usuario con Facebook:', error);
        throw error;
    }
}

async function deleteUser(id){
    try{
        const progresoQuery = 'DELETE FROM progresozona WHERE id_usuario = $1';
        await db.query(progresoQuery, [id]);
        const visitaQuery = 'DELETE FROM visita WHERE id_usuario = $1';
        await db.query(visitaQuery, [id]);
        const encuestaQuery = 'DELETE FROM encuestasatisfaccion WHERE id_usuario = $1';
        await db.query(encuestaQuery, [id]);
        const respuestaQuery = 'DELETE FROM respuestatrivia WHERE id_usuario = $1';
        await db.query(respuestaQuery, [id]);
        const query = 'DELETE FROM usuario WHERE id_usuario = $1';
        await db.query(query, [id]);
    } catch(error){
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

async function findUserById(id){
    try{
        const query = 'SELECT * FROM usuario WHERE id_usuario = $1';
        const {rows} = await db.query(query, [id]);
        return rows[0];
    } catch(error){
        console.error('Error al buscar usuario por id:', error);
        throw error;
    }
}

async function updateUserEmailAndPassword(userId,email,password){
    try{
        const query = 'UPDATE usuario SET email = $1, password = $2 WHERE id_usuario =$3 RETURNING *'
        const {rows} = await db.query(query,[email,password,userId]);
        return rows[0];
    }catch(error){
        console.error("Error al intentar actualizar correo y/o contraseña");
        throw error;
    }
}

async function getUserEmails(){
    try{
        const query = 'SELECT email FROM usuario WHERE rol = $1';
        const {rows} = await db.query(query, ['usuario']);
        return rows.map(row => row.email);
    }catch(error){
        console.error('Error al obtener los correos de los usuarios:', error);
        throw error;
    }
}

async function saveRefreshToken(userId, refreshToken){
    try{
        const query = 'UPDATE usuario SET refresh_token = $1 WHERE id_usuario = $2;';
        await db.query(query, [refreshToken, userId]);
    }catch(error){
        console.error('Error al guardar el refresh token:', error);
        throw error;
    }
}

async function getRefreshToken(userId){
    try{
        const query = 'SELECT refresh_token FROM usuario WHERE id_usuario = $1;';
        const {rows} = await db.query(query, [userId]);
        return rows[0]?.refresh_token || null;
    }catch(error){
        console.error('Error al obtener el refresh token:', error);
        throw error;
    }
}

async function invalidateRefreshToken(userId){
    try{
        const query = 'UPDATE usuario SET refresh_token = NULL WHERE id_usuario = $1;';
        await db.query(query, [userId]);
    }catch(error){
        console.error('Error al invalidar el refresh token:', error);
        throw error;
    }
}

module.exports = {getUserInfo,updateUserEmailAndPassword,findUserByEmail, createUser, createProgressForuser, findUserByGoogleId, createUserByGoogle, findUserById, findUserByFacebookId, createUserByFacebook, deleteUser, createAdminUser, getUserEmails, saveRefreshToken, getRefreshToken, invalidateRefreshToken};