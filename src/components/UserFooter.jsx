import { useState, useEffect } from "react";
export default function UserFooter({ user }) {
  let { photo_url, first_name, last_name } = user?.tele_userinfo_full;
  return <div className="user-footer">
    <ul>
      <li className="ava-username">
        <img className="__ava" src={ photo_url } width={ `24px` } /> 
        <span>{ first_name } { last_name }</span>
      </li>
      <li>
        Lượt chơi còn lại { user.turn }  
      </li>
    </ul>
  </div>
}