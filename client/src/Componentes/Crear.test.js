import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";


import Crear from "./Crear"
import {store} from '../store/index'


configure({ adapter: new Adapter() });



  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("<Create/>", () => {
    // const mockStore = configureStore([thunk]);
    let wrapper
    // let store = mockStore(state);
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Crear />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar 2 form", () => {
      expect(wrapper.find("form")).toHaveLength(2);
    });

      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(0).text()).toEqual('Name:');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(1).text()).toEqual('Description:');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(2).text()).toEqual('Released Date:');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(3).text()).toEqual('Rating:');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(4).text()).toEqual('Image URL:');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(5).text()).toEqual('Genres');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(6).text()).toEqual('Platforms');
      })
      it('Renderiza un label con el texto igual a "name"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('button').at(1).text()).toEqual('Create!');
      })
    
      it('Should render one Search Bar', () => {
        expect(wrapper.find(NavLink)).toHaveLength(1);
      });
      it('Renderiza un boton con el "type" "submit"', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(2)
      })
     


  })
