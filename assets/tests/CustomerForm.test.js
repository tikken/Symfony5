import React from 'react';
import { createContainer } from './utils/domManipulators';
import { CustomerForm } from '../js/components/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
    const firstNameField = () => form('customer').elements.firstName;
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    it('renders the first name field as a text box', () => {
        render(<CustomerForm />);
        const field = form('customer').elements.firstName;
        expect(field).not.toBeNull();
        expect(field.tagName).toEqual('INPUT');
        expect(field.type).toEqual('text');
    });

    it('includes the existing value for the first name', () => {
        render(<CustomerForm firstName="Ashley" />);
        const field = form('customer').elements.firstName;
        expect(firstNameField().value).toEqual('Ashley');
    });


    it('renders a label for the first name field', () => {
        render(<CustomerForm />);
        expect(labelFor('firstName')).not.toBeNull();
        expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('assigns an id that matches the label id to the first name field', () => {
        render(<CustomerForm />);
        expect(firstNameField().id).toEqual('firstName');
    });

    it('renders a label for the first name field', () => {
        render(
            <CustomerForm
                firstName="Ashley"
                onSubmit={({ firstName }) =>
                    expect(firstName).toEqual('Ashley')
                }
            />
        );
        expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('saves existing first name when submitted', async () => {
        expect.hasAssertions();
        render(
            <CustomerForm
                firstName="Ashley"
                onSubmit={({ firstName }) =>
                    expect(firstName).toEqual('Ashley')
                }
            />
        );

        await ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('saves new first name when submitted', async () => {
        expect.hasAssertions();
        render(
            <CustomerForm
                firstName="Ashley"
                onSubmit={({ firstName }) => expect(firstName).toEqual('Jamie')
                }
            />
        );

        await ReactTestUtils.Simulate.change( firstNameField(), {
            target: { value: 'Jamie' }
        });

        await ReactTestUtils.Simulate.submit(form('customer'));
    });
});