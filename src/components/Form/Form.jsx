/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useCallback } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('');

  const {tg} = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      street,
      country,
      subject
    };

    tg.sendData(JSON.stringify(data));
  }, [country, city, subject])

  useEffect(() => {
    tg.onEvent('MainButtonClicked', onSendData);
    
    return () => {
      tg.offEvent('MainButtonClicked', onSendData);
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные'
    })
  }, [])

  useEffect(() => {
    if (!country || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street])

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  }

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  }

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  }
  
  return (
    <div className={"form"}>
      <h3>Форма</h3>

      <input
        type="text"
        className={"input"}
        placeholder={"Country"}
        value={country}
        onChange={onChangeCountry}
      />

      <input
        type="text"
        className={"input"}
        placeholder={"Street"}
        value={street}
        onChange={onChangeStreet}
      />

      <select
        className={"select"}
        value={subject}
        onChange={onChangeSubject}
      >
        <option value={"physical"}>Fiz lico</option>
        <option value={"legal"}>Other lico</option>
      </select>
    </div>
  );
};

export default Form;
