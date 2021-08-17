import React from 'react'
import {render} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {mount} from 'enzyme';
import {Home} from './Home';


describe('<Home /> Mounted', () => {
    it('Home should not have any h2 elements', () => {
        const {queryByText} = render(<Router><Home /></Router>)
        const element = queryByText('h2 test');
        expect(element).not.toBeInTheDocument();
    });
    it('Home must have a h1 that says "Plan your meals"', () => {
        const {container} = render(<Router><Home /></Router>)
        const element = container.querySelector('h1')
        expect(element.innerHTML).toBe('Plan your meals')
    });
    it('Home must have a Start button', () => {
        const {container} = render(<Router><Home /></Router>)
        const element = container.querySelector('a')
        expect(element.innerHTML).toBe('Start')
    });
    it('Start button must redirect to /recipes', () => {
        const {container} = render(<Router><Home /></Router>)
        const element = container.querySelector('a')
        expect(element.innerHTML).toBe('Start')
        expect(element.href).toBe('http://localhost/recipes')
    });
})
