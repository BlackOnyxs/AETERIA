import { useDispatch, useSelector } from "react-redux";
import {
  onCreateResource,
  onDeleteResource,
  onLoadResource,
  onSetActiveResource,
  onSetError,
  onSetIsLoading,
  onSetIsSaving,
  onUpdateResource,
} from "../store/resource/resource";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const useResourceStore = () => {
  const { isLoading, isSaving, activeResource, resources, errorMessage } =
    useSelector((state) => state.resources);

  const dispatch = useDispatch();

  const setActiveResource = async (resource) => {
    dispatch(onSetActiveResource(resource));
  };

  const loadReources = async (uid, type = "videos") => {
    dispatch(onSetIsLoading(true));

    try {
      const collectionRef = collection(FirebaseDB, `${uid}/resources/${type}/`);
      const docs = await getDocs(collectionRef);

      const resources = [];
      docs.forEach((doc) => {
        resources.push({ id: doc.id, ...doc.data() });
      });

      dispatch(onLoadResource(resources));
      dispatch(onSetIsLoading(false));
    } catch (error) {
      dispatch(onSetError(error.message));
      dispatch(onSetIsLoading(false));
    }
  };

  const saveResource = async ({
    id,
    title,
    url,
    uid,
    type = "images",
    visibility = "private",
    mini,
  }) => {
    dispatch(onSetIsSaving(true));

    try {
      if (!id) {
        let newResource;
        if (type !== "images") {
          newResource = {
            title,
            url,
            visibility,
            mini,
          };
        } else {
          newResource = {
            title,
            url,
            visibility,
          };
        }
        console.log(newResource);
        const newDoc = doc(collection(FirebaseDB, `${uid}/resources/${type}`));
        await setDoc(newDoc, newResource);

        dispatch(onCreateResource({ id: newDoc.id, ...newResource }));
        dispatch(onSetIsLoading(false));
      } else {
        const docRef = doc(FirebaseDB, `${uid}/aeteria/${id}`);
        await setDoc(docRef, { title, url }, { merge: true });
        dispatch(onUpdateResource({ id, title, url }));
        dispatch(onSetIsLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(onSetError(error.message));
      dispatch(onSetIsLoading(false));
    }
  };

  const loadResourcesFromRoot = async( type = 'videos') => {
    dispatch(onSetIsLoading(true));

    try {
      const collectionRef = collection(FirebaseDB, `${type}/`);
      const docs = await getDocs(collectionRef);

      const resources = [];
      docs.forEach((doc) => {
        resources.push({ id: doc.id, ...doc.data() });
      });

      dispatch(onLoadResource(resources));
      dispatch(onSetIsLoading(false));
    } catch (error) {
      dispatch(onSetError(error.message));
      dispatch(onSetIsLoading(false));
    }
  }

  const deleteResource = async ({ uid, id }) => {
    dispatch(onSetIsLoading(true));
    try {
      const docRef = doc(FirebaseDB, `${uid}/aeteria/reources/${id}`);
      await deleteDoc(docRef);
      dispatch(onSetIsLoading(false));
      dispatch(onDeleteResource());
    } catch (error) {
      dispatch(onSetError(error.message));
      dispatch(onSetIsLoading(false));
    }
  };

  return {
    // Properties
    isLoading,
    isSaving,
    activeResource,
    resources,
    errorMessage,
    // Methods
    setActiveResource,
    loadReources,
    loadResourcesFromRoot,
    saveResource,
    deleteResource,
  };
};
