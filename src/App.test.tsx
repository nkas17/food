import 'whatwg-fetch';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from './utils/testUtils';
import App from './App';

const server = setupServer(
  rest.get('http://localhost:3000/recipes', (req, res, ctx) =>
    res(
      ctx.json([
        {
          _id: {
            $oid: '593f6ceec2ef162c8cca24ec',
          },
          title: 'quiche',
          description: 'delicious Spinach Quiche and Ham & Cauliflower quiche',
          category: 'other',
          id: 'quiche',
          ingredients:
            'pie crust\nhalf n half\nmilk\neggs\ncheddar cheese\nparmesan cheese\nham\ncauliflower\nspinach',
          directions:
            'prepare pie crust by cooking per package directions or at 350 for 5-10 minutes.\n\nsteam cauliflower\nchop ham into 1/4 - 1/2 cubes\ngrade 8 oz cheese 4 per quiche\ndefrost and press water out of spinach\n\ngently press cheese into bottom of crust\nspread spinach on cheese\nspread cauliflower and ham on cheese in other crust\n\nbeat 7-8 eggs very well, mix 1 cup hal n half and 1 cup milk totaling about 4 cups of liquid\nmix well\npour half of egg/half n half/milk mixture into pir crust over spinach and ham and cauliflower\n\nsprinkle parmesan cheese over top\n\nbake at 350 for 45 - 60 minutes or until top is swollen and firm and lightly browned\n\n',
        },
        {
          _id: {
            $oid: '593f6e31bd966f4138b1faed',
          },
          title: 'tacos 2.2',
          description: 'yummy',
          category: 'beef',
          id: 'tacos-2.2',
          ingredients: 'meat\nveggies',
          directions: 'cook and serve',
        },
      ]),
    ),
  ),
  rest.post('http://localhost:3000/user/login', (req, res, ctx) =>
    res(
      ctx.json({
        id: 1,
        user: 'the user',
        token: 'the-token',
      }),
    ),
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

window.scroll = jest.fn();
const setBrowserLocation = function setBrowserLocation(path = '/') {
  window.history.pushState({}, 'test', path);
};

describe('App runs happy path', () => {
  it('should load recipes and navigates through app', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // assert Header exists
    expect(screen.getByRole('heading', { name: /let's eat!/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /search recipes/i })).toBeInTheDocument();

    await screen.findByLabelText('username');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const recipeLink = screen.getByRole('link', { name: /recipes/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    // Home
    expect(homeLink.firstChild).toHaveClass('bold', { exact: true });
    expect(recipeLink.firstChild).not.toHaveClass('bold', { exact: true });
    expect(aboutLink.firstChild).not.toHaveClass('bold', { exact: true });
    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Recipes
    await user.click(recipeLink);
    expect(window.scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    expect(homeLink.firstChild).not.toHaveClass('bold', { exact: true });
    expect(recipeLink.firstChild).toHaveClass('bold', { exact: true });
    expect(aboutLink.firstChild).not.toHaveClass('bold', { exact: true });
    expect(screen.getByRole('link', { name: /quiche/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tacos 2.2/i })).toBeInTheDocument();

    // About
    await user.click(aboutLink);
    expect(window.scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    expect(homeLink.firstChild).not.toHaveClass('bold', { exact: true });
    expect(recipeLink.firstChild).not.toHaveClass('bold', { exact: true });
    expect(aboutLink.firstChild).toHaveClass('bold', { exact: true });
    expect(screen.getByRole('link', { name: /nathan m weller/i })).toBeInTheDocument();
  });

  it('should login and out', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // assert Header exists
    expect(screen.getByRole('heading', { name: /let's eat!/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /search recipes/i })).toBeInTheDocument();

    await screen.findByLabelText('username');

    // enter username and password
    user.type(screen.getByLabelText(/username/i), 'un');
    user.type(screen.getByLabelText(/password/i), 'pw');

    // click login
    await user.click(screen.getByRole('button', { name: /login/i }));

    // assert username and password inputs are gone
    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();

    // assert login in gone and log out is visible
    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /logout/i })).toBeInTheDocument();

    // click logout
    await user.click(screen.getByRole('button', { name: /logout/i }));

    // assert log out is gone and login is back along with inputs
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
