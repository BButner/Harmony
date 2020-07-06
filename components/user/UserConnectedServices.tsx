import React, { FunctionComponent } from 'react'
import CardGeneric from '../cards/CardGeneric'
import { ModelUserSelf } from '../../models/user/ModelUser'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import PopupGeneric from '../popups/PopupGeneric'

interface UserConnectedServicesProps {
  self: ModelUserSelf;
}

const UserConnectedServices: FunctionComponent<UserConnectedServicesProps> = ({ self }) => {
  console.log(self)
  return (
    <CardGeneric title="Connected Services" className="m-4 connectedServicesCard">
      <div className="flex w-full justify-center mb-16">
        {Object.keys(self.connectedServices).filter(key => !['_id', 'userid', '__v'].includes(key.toLowerCase()) && self.connectedServices[key]).map(key => {
          const service = key.replace('Connected', '').toLocaleLowerCase()
          const connected = self.connectedServices[key]

          return (
            <img key={service} className="w-16 h-16" src={`/images/logos/${service}.png`}/>
          )
        })}
      </div>
      <button className="m-auto block button"><Icon path={mdiPlus} size={0.75}/></button>
      <PopupGeneric title="Connect Service" closable>
        <p>This is a test</p>
      </PopupGeneric>
    </CardGeneric>
  )
}

UserConnectedServices.propTypes = {
  self: PropTypes.any.isRequired
}

export default UserConnectedServices
