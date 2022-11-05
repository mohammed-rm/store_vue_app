import firebase from "@/firebase.js";

/**
 * @function getDoc() : Récupère un élément spécifique d'une collection
 *
 * @param {String} collection
 * @param {String} id
 *
 * @example :
 *      getDoc("materiel", K8MOGu5nVZ7XxcLTggN5);
 *
 * * Cette fonction renverra :
 *      Nom :"Samsung S10"
 *      Photo : ""
 *      Ref : "AN123"
 *      Tel : 600000000
 *      Version: "V8.0"
 */
export async function getDoc(collection, id) {
  let uniqDoc = firebase.db.collection(collection).doc(id);
  let doc = await uniqDoc.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }
}

/**
 * @function createDoc() : Crée un élément dans une collection
 *
 * @param {String} collection : Contient le nom de la collection dans laquelle il faut ajouter un élément
 * @param {Object} data : Contient la liste des données de l'élément à ajouter
 *
 * @example :
 *      let data = {
 *          nom : "Iphone 11",
 *          ref : "AP11",
 *          tel: 699999999,
 *          version : "V9.0"
 *      }
 *      createDoc("materiel", data)
 *
 * * Cette fonction va créer un élément dans la collection matériel contenant les données incluses dans data
 */
export async function createDoc(collection, data) {
  await firebase.db
    .collection(collection)
    .doc()
    .set(data);
}

export function filterInt(value) {
  if (/^(-|\+)?(\d+|Infinity)$/.test(value)) return Number(value);
  return NaN;
}
