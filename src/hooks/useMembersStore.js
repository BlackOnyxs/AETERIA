import { useDispatch, useSelector } from 'react-redux';
import { onLoadMembers, onSetActiveMember, onSetMembersLoading } from '../store/';
import { collection, getDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


export const useMembersStore = () => {

    const dispatch = useDispatch();
    const {
        isLoadingMembers,
        members,
        activeMember,
        errorMensaje,
    } = useSelector( state => state.members );

    const setActiceMember = ( member ) => {
        dispatch( onSetActiveMember( member ) );
    }

    const startLoadMembers = async() => {
        dispatch( onSetMembersLoading( true ) );
        try {
            const collectionRef = collection( FirebaseDB, 'members');
            const docs = await getDocs( collectionRef );
        
            const members = [];
            docs.forEach( doc => {
                members.push({ id: doc.id, ...doc.data() });
            });    

            dispatch( onLoadMembers( members ));
            dispatch( onSetMembersLoading( false ) );
        } catch (error) {
            dispatch( onSetMembersLoading( false) );
        }
    }

    return {
        // Properties
        isLoadingMembers,
        members,
        activeMember,
        errorMensaje,
        // Methods
        setActiceMember,
        startLoadMembers,
    }
}