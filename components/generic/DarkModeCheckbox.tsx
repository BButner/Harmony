import { updateDarkMode } from 'lib/pusher/PusherUser'
import { ModelUserSetting } from 'models/user/ModelUserSetting'
import React, { FunctionComponent } from 'react'

type DarkModeCheckboxProps = {
  idExternal: string;
  dataSettings: ModelUserSetting;
  mutateSettings: Function;
}

const DarkModeCheckbox: FunctionComponent<DarkModeCheckboxProps> = ({ idExternal, dataSettings, mutateSettings }) => {
  const handleOnChange = (): void => {
    const newSettings = {...dataSettings, darkMode: !dataSettings.darkMode}

    updateDarkMode(idExternal, newSettings)
      .then(resp => {
        mutateSettings(newSettings)
        document.body.classList.toggle('dark')
      })
  }

  return (
    <div className="flex justify-center items-center space-x-4">
      <p>Dark Mode</p>
      <div className="checkbox">
        <input type="checkbox" id="darkMode" checked={dataSettings && dataSettings.darkMode} onChange={(e): void => handleOnChange()} />
        <label htmlFor="darkMode"></label>
      </div>
    </div>
  )
}

export default DarkModeCheckbox
