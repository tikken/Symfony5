import React from 'react';
import { createContainer } from './utils/domManipulators';
import AppointmentForm from '../js/components/AppointmentForm';

describe('AppointmentForm', () => {
    let render, container;

    const selectableServices = [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'
    ];

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('appointment').elements[name];
    const findOption = (dropdownNode, textContent) => {
        const options = Array.from(dropdownNode.childNodes);
        return options.find(
            option => option.textContent === textContent
        );
    };

    it('renders a form', () => {
        render(<AppointmentForm selectableServices={selectableServices} />);
        expect(form('appointment')).not.toBeNull();
    });

    describe('service field', () => {
        it('renders as a select box', () => {
            render(<AppointmentForm selectableServices={selectableServices} />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });
    });

    it('initially has a blank value chosen', () => {
        render(<AppointmentForm selectableServices={selectableServices} />);
        const firstNode = field('service').childNodes[0];
        expect(firstNode.value).toEqual('');
        expect(firstNode.selected).toBeTruthy();
    });

    it('lists all salon services', () => {

        render(  <AppointmentForm selectableServices={selectableServices} /> );

        const optionNodes = Array.from(
            field('service').childNodes
        );

        const renderedServices = optionNodes.map(
            node => node.textContent
        );

        expect(renderedServices).toEqual(
            expect.arrayContaining(selectableServices)
        );
    });

    it('pre-selects the existing value', () => {
        const services = ['Cut', 'Blow-dry'];
        render(
            <AppointmentForm
                selectableServices={services}
                service="Blow-dry"
            />
        );
        const option = findOption(
            field('service'),
            'Blow-dry'
        );
        expect(option.selected).toBeTruthy();
    });
});
