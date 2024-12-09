import { useState, useEffect } from "react";
import { useBackendViewContext } from "../context/BackendViewContext";
import Modal from "./Modal";

const __DEFAULT_U = null;

export default function UserEditModal() {
  const { users, userEdit, setUserEdit, modalEditActive, setModalEditActive, fn } = useBackendViewContext();
  const { onUpdateUser } = fn;
  const [u, setU] = useState(null);

  useEffect(() => {
    if(!userEdit) {
      setU(__DEFAULT_U);
      return;
    }

    let _user = [...users].find(u => u.__id == userEdit);
    setU({..._user})
  }, [userEdit])

  const onUpdate = (value, name) => {
    let _u = { ...u, [name]: value };
    setU(_u);
  }

  return <Modal heading={ `User Edit` } active={ modalEditActive } onClose={ () => {
    setModalEditActive(false);
    setUserEdit(null);
  } }>
    {/* { JSON.stringify(u) } */}
    <>
      {
        u && 
        (() => {
          const { tele_userinfo_full } = u;
          return <div className="u-edit">
            <div className="u-heading">
              User <u>{ tele_userinfo_full?.first_name } { tele_userinfo_full?.last_name } ({ tele_userinfo_full?.id })</u>

              <div style={{ fontSize: `10px` }}>
                { JSON.stringify(tele_userinfo_full) }
              </div>
              {/* { JSON.stringify(u) } */}
            </div>
            <fieldset>
              <legend>Point</legend>
              <input type="number" value={ u?.point } onChange={ e => { onUpdate(e.target.value, 'point') } } />
            </fieldset>
            <fieldset>
              <legend>Turn</legend>
              <input type="number" value={ u?.turn } onChange={ e => { onUpdate(e.target.value, 'turn') } } />
            </fieldset>
            <div className="u-actions">
              <button type="button" className="button" onClick={ async e => {
                e.preventDefault();
                
                await onUpdateUser(u.__id, {
                  point: parseInt(u.point),
                  turn: parseInt(u.turn),
                });

                setModalEditActive(false);
                setUserEdit(null);

              } }>Update</button>
            </div>
          </div>
        })()
      }
    </>
  </Modal>
}