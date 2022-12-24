import React, { ReactNode } from 'react'


interface Props {
    children?: ReactNode
}

const AppContainer = ({children}: Props) => {
    let styleContainer = {
        height: '100vh',
     } as React.CSSProperties
    

    return (
       
          
                <div id='app_container' style={styleContainer}>
                    {children}
                </div>
         
    )
}

export default AppContainer
