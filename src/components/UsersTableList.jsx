import { useBackendViewContext } from "../context/BackendViewContext";

export default function UsersTableList() {
  const { users, setUserEdit, setModalEditActive } = useBackendViewContext();
  return <div>
    <h4>Users</h4>
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Userinfo</th>
          <th>Point</th>
          <th>Turn</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          users.length > 0 &&
          users.map((u, __u_index) => {
            const { tele_userinfo_full, turn, point, __id } = u;
            return <tr key={ __id } >
              <td>{ __u_index + 1 }</td>
              <td>{ tele_userinfo_full?.first_name } { tele_userinfo_full?.last_name } ({ tele_userinfo_full?.id })</td>
              <td>
                ???
                {/* { JSON.stringify(tele_userinfo_full) } */}
              </td>
              <td>{ point }</td>
              <td>{ turn }</td>
              <td><a href="#" onClick={ e => {
                e.preventDefault();
                setUserEdit(__id);
                setModalEditActive(true);
              } }>Edit</a></td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}