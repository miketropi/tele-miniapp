import { useBackendViewContext } from "../context/BackendViewContext"

export default function GameSettings() {
  const { gameSettings, setGameSettings, fn } = useBackendViewContext();
  const { onUpdateSettings } = fn;

  const onChangeField = (field, value) => {
    let _gameSettings = { ...gameSettings };
    _gameSettings[field] = value;
    setGameSettings(_gameSettings);
  }

  return <div className="game-settings-container">
    <h4>Settings</h4>
    {
      gameSettings && <>
        <table className="table">
          <thead>
            <tr>
              <th width={ `30%` }>Label</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(gameSettings).filter( f => (f != '__id') ).map((f, __f_index) => {
                return <tr key={ f }>
                  <td>{ f }</td>
                  <td>
                    <input type="text" value={ gameSettings[f] } onChange={ e => { onChangeField(f, e.target.value) } } />
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
        <div className="__action">
          <button type="button" className="button" onClick={ async e => {
            let _gameSettings = { ...gameSettings }
            delete _gameSettings.__id;
            await onUpdateSettings(_gameSettings);
          } }>Save Settings</button>
        </div>
      </>
    }
  </div>
}