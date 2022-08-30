import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "../Page/Login";
import { BrowserRouter, Route } from "react-router-dom";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import userEvent from '@testing-library/user-event';
import moment from 'moment'

export const lookupValuesOrDefault = (
    requirements,
    sections,
    missingString
) => {
    return sections.reduce((acc, section) => {
        let value = requirements[section] === undefined ? missingString : requirements[section];
        console.log("check req of sections’, missingString");
        const regex = /^[0-9]{4}[/-][0-9]{2}[/-][0-9]{2}$/g;
        if (regex.test(value)) {
            value = moment(value)
                .local()
                .format("L")
                .toString();
        }

        return {
            ...acc,
            [section]: value
        };
    }, {});
};


const initialState = {
  searchLoading: false,
  getValue: false,
  appEmail: "app@test.com",
  appPassword: "app123456",
  postJob: true,
};


describe("login screen", () => {
  beforeEach(()=>{
    render(
        <StateContext.Provider value={initialState}>
          <DispatchContext.Provider value={null}>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </DispatchContext.Provider>
        </StateContext.Provider>
      );   
  }) 

  test("is Login screen has some text", () => {
    const textone = screen.getByText(/Login using your Email/i);
    expect(textone).toBeInTheDocument();
    const texttwo = screen.getByText(
      /lease enter your email and Password to login to freeboh/
    );
    expect(texttwo).toBeInTheDocument();
  });

  test("user event on on input name email",()=>{
      const inputOne =  screen.getByLabelText(/email/i);
      userEvent.type(inputOne, 'Hello,World!')
      expect(inputOne).toHaveValue('Hello,World!')

  });
  test("user event on on input name password",()=>{
    const inputOne =  screen.getByLabelText(/Password/i);
    userEvent.type(inputOne, 'qwerty123!')
    expect(inputOne).toHaveValue('qwerty123!')

});
test("user event on on input type radio button",()=>{
    const radio =  screen.getByTestId(/radio-button-one/i);
    const radiobuttontwo =  screen.getByTestId(/radio-button-two/i);
    fireEvent.change(radio, { target: { value: true } });
    fireEvent.change(radiobuttontwo, { target: { value: false } });
    expect(radio).toHaveProperty("checked", true);
    expect(radiobuttontwo).toHaveProperty("checked", false);

});
test("lookupValuesOrDefault",()=>{
    const requirements ={
        'a' : 'data',
        'b' : 'data2',
        'c' : '2022-08-24'
        };
    const sections = ['a', 'b', 'c'] ;
    const missingString = 'N/A'
    const returnMessage = lookupValuesOrDefault(requirements,sections,missingString);
    expect(returnMessage).toEqual({"a": "data", "b": "data2","c":"08/24/2022"})
})
});

