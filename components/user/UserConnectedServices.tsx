import React, { FunctionComponent, useState } from 'react'
import CardGeneric from '../cards/CardGeneric'
import { ModelUserSelf } from '../../models/user/ModelUser'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import PopupGeneric from '../popups/PopupGeneric'
import { getServiceNameFromId } from '../../lang/LangService'
import Config from '../../config/default.json'

interface UserConnectedServicesProps {
  self: ModelUserSelf;
}

const UserConnectedServices: FunctionComponent<UserConnectedServicesProps> = ({ self }) => {
  const [showConnectServices, setShowConnectServices] = useState<boolean>(false)

  const hideConnectService = (): void => {
    setShowConnectServices(false)
  }

  return (
    <div>
      <CardGeneric title="Connected Services" className="m-4 connectedServicesCard">
        <div className="flex w-full justify-center mb-16">
          {Object.keys(self.connectedServices).filter(key => !['_id', 'userid', '__v'].includes(key.toLowerCase()) && self.connectedServices[key]).map(key => {
            const service = key.replace('Connected', '').toLocaleLowerCase()

            return (
              <div key={service} className="text-center w-32">
                <p>{getServiceNameFromId(service)}</p>
                <img className="w-16 h-16 mt-4 m-auto" src={`/images/logos/${service}.png`}/>
              </div>
            )
          })}
          {Object.keys(self.connectedServices).filter(key => !['_id', 'userid', '__v'].includes(key.toLowerCase())).filter(k => self.connectedServices[k]).length === 0 &&
            <p>No Connected Services</p>
          }
        </div>
        <button className="m-auto block button button-teal" onClick={(): void => setShowConnectServices(true)}><Icon path={mdiPlus} size={0.75}/></button>
      </CardGeneric>
      {showConnectServices && <PopupGeneric title="Connect Service" closable onValueChange={hideConnectService}>
        <div className="flex justify-between">
          {Object.keys(self.connectedServices).filter(key => !['_id', 'userid', '__v'].includes(key.toLowerCase()) && !self.connectedServices[key]).map(key => {
            const service = key.replace('Connected', '').toLocaleLowerCase()

            const connectService = (service: string): void => {
              window.location.href = `${Config.apiUrl}/service/${service}/connect`
            }

            return (<div key={service} className="text-center w-32">
              <p>{getServiceNameFromId(service)}</p>
              <img className="w-16 h-16 m-auto mt-4 mb-5" src={`/images/logos/${service}.png`}/>
              <button className="button" onClick={(): void => connectService(service)}>Connect</button>
            </div>)
          })}
        </div>
      </PopupGeneric>}
    </div>
  )
}

UserConnectedServices.propTypes = {
  self: PropTypes.any.isRequired
}

export default UserConnectedServices
