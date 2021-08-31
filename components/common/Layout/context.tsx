import { ThemeProvider } from 'next-themes'
import React, { FC } from 'react'

export interface State {
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  displayToast: boolean
  modalView: string
  toastText: string
  userAvatar: string
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  displayToast: false,
  toastText: '',
  userAvatar: '',
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_TOAST'
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_TOAST_TEXT'
      text: ToastText
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }
  | {
      type: 'SET_USER_AVATAR'
      value: string
    }

type MODAL_VIEWS =
  | 'SIGNUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'NEW_SHIPPING_ADDRESS'
  | 'NEW_PAYMENT_METHOD'
type ToastText = string

export const LayoutContext = React.createContext<State | any>(initialState)

LayoutContext.displayName = 'LayoutContext'

export const LayoutProvider: FC = (props) => {
  const [defaultMenuNode, setDefaultMenuNode] = React.useState(null)
  const [menuNode, setMenuNode] = React.useState(defaultMenuNode)
  return (
    <LayoutContext.Provider
      value={{
        defaultMenuNode,
        menuNode,
      }}
      {...props}
    />
  )
}

export const useUI = () => {
  const context = React.useContext(LayoutContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a LayoutProvider`)
  }
  return context
}

export const ManagedLayoutContext: FC = ({ children }) => (
  <LayoutProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </LayoutProvider>
)
