import React from 'react';
import { createContainer } from './utils/domManipulators';
import { CustomerForm } from '../js/components/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

const handleChangeFirstName = ({ target }) =>
    setCustomer(customer => ({
        ...customer,
        firstName: target.value
    }));

const handleChangeLastName = ({ target }) =>
    setCustomer(customer => ({
        ...customer,
        lastName: target.value
    }));

const handleChangePhoneNumber = ({ target }) =>
    setCustomer(customer => ({
        ...customer,
        phoneNumber: target.value
    }));

const handleChange = ({ target }) =>
    setCustomer(customer => ({
        ...customer,
        [target.name]: target.value
    }));


describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
    const field = name => form('customer').elements[name];
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const itIncludesTheExistingValue = (fieldName) =>
        it('includes the existing value', () => {
            render(<CustomerForm { ...{[fieldName]: 'value'} } />);
            expect(field(fieldName).value).toEqual('value');
        });

    itIncludesTheExistingValue('firstName');

    const itRendersAsATextBox = (fieldName) =>
        it('renders as a text box', () => {
            render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field('firstName'));
        });

    itRendersAsATextBox('firstname');

    const itSubmitsNewValue = (fieldName, value) =>
        it('saves new value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    { ...{[fieldName]: 'existingValue'} }
                    onSubmit={props =>
                        expect(props[fieldName]).toEqual(value)
                    }
                />);

            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: { value: 'firstName', name: value }
            });

            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    itSubmitsNewValue('firstName', 'firstName');

    describe('first name field', () => {
        itRendersAsATextBox('firstName');
        itIncludesTheExistingValue('firstName');

        // XXX TO DO
        // itRendersALabel('firstName', 'First name');
        // itAssignsAnIdThatMatchesTheLabelId('firstName');
        // itSubmitsExistingValue('firstName', 'firstName');
        // itSubmitsNewValue('firstName', 'anotherFirstName');
    });

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
        expect(field('firstName').value).toEqual('Ashley');
    });

    it('renders a label for the first name field', () => {
        render(<CustomerForm />);
        expect(labelFor('firstName')).not.toBeNull();
        expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('assigns an id that matches the label id to the first name field', () => {
        render(<CustomerForm />);
        expect(field('firstName').id).toEqual('firstName');
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

        await ReactTestUtils.Simulate.change( field('firstName'), {
            target: { value: 'Jamie' }
        });

        await ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('has a submit button', () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector(
            'input[type="submit"]'
        );
        expect(submitButton).not.toBeNull();
    });
});