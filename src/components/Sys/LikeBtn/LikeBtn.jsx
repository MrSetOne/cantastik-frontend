import React from "react";

// * COSAS A TENER EN CUENTA
// [ ] Tienes que poder dar Like y quitarlo
// [ ] Tienes que hacerlo desde el postSlice (Llamada a la API)
// [ ] Tienes que hacerlo desde el userSlice (Mutar estado User)
// [ ] Las funciones del postSlice reciben la iteración, revisa para que sirve.
// [ ] Los dos slice tienen como primer parametro el id del post
// [ ] El token se extrae de Redux
// [ ] Tienes que traerte al usuario desde Redux para revisar si incluye esa publicacion entre sus likes
// [ ] Estudiar posible reformulación y revisar si esta dado el like desde el post en lugar que desde el usuario, seria mas eficiente con cara a la escalabilidad.
// [ ] Hay dos tipos de likes unos con iconos de FA y otros con Buttons de Ant-D

// ? Booleano para verificar si el usuario ha dado like
// user.likedPosts.includes(item._id) ? quitarLike : darLike

// ? Ejemplo de like:
// const doALike = async () => {
//   await dispatch(like({ postId: item._id, i: item.i }));
//   await dispatch(addLike(item._id));
// };

// ? Ejemplo de dislike:
// const doAnUnlike = async () => {
//   await dispatch(unlike({ postId: item._id, i: item.i }));
//   await dispatch(removeLike(item._id));
// };

const LikeBtn = () => {
  return <div>LikeBtn</div>;
};

export default LikeBtn;
