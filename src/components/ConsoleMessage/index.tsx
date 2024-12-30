import React, { useEffect, useState } from 'react'

type Props = {}

const ConsoleMessage = (props: Props) => {  
  const art = `

             .
         ___/|'              _____
    ____/_. .'              //'''/
 __<|,, @   }|            .'____(___        .
 \\====)   } >           '/.------'/   ___ /_\\
    |^^_  }  \\          / \\--'._  (   / _ \\//
    |/  \\ _   >       .'/\\_-.. ''-.> ( (_) )'
         (_)  \\  ____//\\'. ''\\'.  '___\\_/ .'
         (__)  >/--/-\\' '.\\   ''\\.' .___.'
  <)=\\   (__) //_//  ||  _\\\\__ .'   )
 <)=+ '.  (_)_/ |/\\__||_/  ' \\      '.
  <)= . '._(_(  __   \\/       \\_       \\
    |/ '.  _\\| /   _/_/_/~~/~~~/'.___.  '.__
    '    |/ /  _  )       ( /_ \\      \\_    \\
           / // \\/        '.  |/~       |  |/~
       <)=/ //          <)=/ //      <)=/ //
      <)=+  (          <)=+  (      <)=+  (
       <)=.'\\=(>        <)=.'\\=(>    <)=.'\\=(>

  `;

  const message = `
Doing some snooping?
If you like what you see let me know at:
hello@aledjones.dev
  `;
  
  useEffect(() => {
    if (!window.artAlreadyLogged) {
      console.log(
        '%c' + art + '%c' + message,
        'color: red; ',
        'color: white; font-size: 16px; font-style: italic;',
      );
      window.artAlreadyLogged = true;
    }
  }, []);
  

  return (
    <></>
  )
}

export default ConsoleMessage;