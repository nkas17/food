import 'whatwg-fetch';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from './utils/testUtils';
import App from './App';

const testing = {
  _id: {
    $oid: '593f6ceec2ef162c8cca24ec',
  },
  title: 'the title',
  description: 'the description',
  category: 'other',
  id: 'testing',
  ingredients: 'the ingredients',
  directions: 'the directions',
};
const momsQuiche = {
  _id: {
    $oid: '593f6ceec2ef162c8cca24ec',
  },
  title: 'moms best',
  description: 'delicious Spinach Quiche and Ham & Cauliflower quiche',
  category: 'other',
  id: 'moms-best',
  ingredients:
    'pie crust\nhalf n half\nmilk\neggs\ncheddar cheese\nparmesan cheese\nham\ncauliflower\nspinach',
  directions:
    'prepare pie crust by cooking per package directions or at 350 for 5-10 minutes.\n\nsteam cauliflower\nchop ham into 1/4 - 1/2 cubes\ngrade 8 oz cheese 4 per quiche\ndefrost and press water out of spinach\n\ngently press cheese into bottom of crust\nspread spinach on cheese\nspread cauliflower and ham on cheese in other crust\n\nbeat 7-8 eggs very well, mix 1 cup hal n half and 1 cup milk totaling about 4 cups of liquid\nmix well\npour half of egg/half n half/milk mixture into pir crust over spinach and ham and cauliflower\n\nsprinkle parmesan cheese over top\n\nbake at 350 for 45 - 60 minutes or until top is swollen and firm and lightly browned\n\n',
};
const quiche = {
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
};
const tacos = {
  _id: {
    $oid: '593f6e31bd966f4138b1faed',
  },
  title: 'tacos 2.2',
  description: 'yummy',
  category: 'beef',
  id: 'tacos-2.2',
  ingredients: 'meat\nveggies',
  directions: 'cook and serve',
};
const server = setupServer(
  rest.get('http://localhost:3000/recipes', (req, res, ctx) => res(ctx.json([quiche, tacos]))),
  rest.patch('http://localhost:3000/recipe', (req, res, ctx) => res(ctx.json(momsQuiche))),
  rest.post('http://localhost:3000/recipe', (req, res, ctx) => res(ctx.json(testing))),
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
// window.matchMedia = jest.fn();

const setBrowserLocation = function setBrowserLocation(path = '/') {
  window.history.pushState({}, 'test', path);
};

describe('App runs happy path scenarios', () => {
  it('should load and display list of recipes and navigate around app', async () => {
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
    expect(homeLink.firstChild).toHaveClass('nmw-bold', { exact: true });
    expect(recipeLink.firstChild).not.toHaveClass('nmw-bold', { exact: true });
    expect(aboutLink.firstChild).not.toHaveClass('nmw-bold', { exact: true });
    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Recipe List
    await user.click(recipeLink);
    expect(window.scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    expect(homeLink.firstChild).not.toHaveClass('nmw-bold', { exact: true });
    expect(recipeLink.firstChild).toHaveClass('nmw-bold', { exact: true });
    expect(aboutLink.firstChild).not.toHaveClass('nmw-bold', { exact: true });
    expect(screen.getByRole('link', { name: /quiche/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tacos 2.2/i })).toBeInTheDocument();

    // Recipe Display
    await user.click(screen.getByRole('link', { name: /tacos 2.2/i }));
    expect(screen.getByRole('heading', { name: /tacos 2.2/i })).toBeInTheDocument();
    expect(screen.getByText(tacos.description)).toBeInTheDocument();
    expect(screen.getByText(tacos.directions)).toBeInTheDocument();

    // About
    await user.click(aboutLink);
    expect(window.scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    expect(homeLink.firstChild).not.toHaveClass('nmw-bold', { exact: true });
    expect(recipeLink.firstChild).not.toHaveClass('nmw-bold', { exact: true });
    expect(aboutLink.firstChild).toHaveClass('nmw-bold', { exact: true });
    expect(screen.getByRole('link', { name: /nathan m weller/i })).toBeInTheDocument();
  });

  it('should navigate to list and filter recipes when searching', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const searchBox = screen.getByRole('textbox', { name: /search recipes/i });

    // assert Header exists
    expect(screen.getByRole('heading', { name: /let's eat!/i })).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();

    await screen.findByLabelText('username');

    // search for quiche
    await user.type(searchBox, 'quiche');

    // assert location changed and quiche is the only recipe in the list
    expect(document.location.pathname).toEqual('/recipe');
    expect(screen.getByRole('link', { name: /quiche/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /tacos 2.2/i })).not.toBeInTheDocument();

    // clear search box
    user.clear(searchBox);

    // assert quiche and tacos are in the list
    expect(screen.getByRole('link', { name: /quiche/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tacos 2.2/i })).toBeInTheDocument();

    // search for tacos
    await user.type(searchBox, 'tacos');

    // assert quiche is no longer in the list and tacos is
    expect(screen.getByRole('link', { name: /tacos 2.2/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /quiche/i })).not.toBeInTheDocument();

    // search for a recipe that doesnt exist
    user.clear(searchBox);
    await user.type(searchBox, 'not a recipe');

    // assert the list is empty
    expect(screen.queryByRole('link', { name: /quiche/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /tacos 2.2/i })).not.toBeInTheDocument();
    expect(screen.getByText(/no recipes to display/i)).toBeInTheDocument();
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

describe('Modifying recipes', () => {
  window.confirm = jest.fn();
  it('should delete a recipe', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await screen.findByLabelText('username');

    // login
    await user.type(screen.getByLabelText(/username/i), 'un');
    await user.type(screen.getByLabelText(/password/i), 'pw');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // navigate to recipe list and click delete
    await user.click(await screen.findByRole('link', { name: /recipes/i }));
    await screen.findAllByRole('button', { name: /delete/i });
    await user.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    // TODO: Finish this test after replacing window.confirm with custom dialog
    // expect(screen.getByText(/recipe deleted/i)).toBeInTheDocument();
  });

  it('should cancel a recipe change', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await screen.findByLabelText('username');

    // login
    await user.type(screen.getByLabelText(/username/i), 'un');
    await user.type(screen.getByLabelText(/password/i), 'pw');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // navigate to recipe list, click quiche then click edit
    await user.click(await screen.findByRole('link', { name: /recipes/i }));
    await user.click(screen.getByRole('link', { name: /quiche/i }));
    await user.click(await screen.findByRole('link', { name: /edit/i }));

    // clear and update the title
    user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), 'Moms Quiche');

    // assert title has been updated
    expect(screen.getByLabelText(/title/i)).toHaveValue('Moms Quiche');

    // cancel change
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    // assert cancel and title is unchanged

    expect(global.location.pathname).toEqual('/recipe/quiche');
    expect(await screen.findByText(/update cancelled/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quiche/i })).toBeInTheDocument();
  });

  it('should modify and save a change to a recipe', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await screen.findByLabelText('username');

    // login
    await user.type(screen.getByLabelText(/username/i), 'un');
    await user.type(screen.getByLabelText(/password/i), 'pw');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // navigate to recipe list, click quiche then click edit
    await user.click(await screen.findByRole('link', { name: /recipes/i }));
    await user.click(screen.getByRole('link', { name: /quiche/i }));
    await user.click(await screen.findByRole('link', { name: /edit/i }));

    // clear and update the title
    user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), 'Moms Best');

    // assert title has been updated
    expect(screen.getByLabelText(/title/i)).toHaveValue('Moms Best');

    // save change
    await user.click(screen.getByRole('button', { name: /save/i }));

    // assert save and title changed
    expect(await screen.findByText(/recipe saved/i)).toBeInTheDocument();
    expect(global.location.pathname).toEqual('/recipe/moms-best');
    expect(screen.getByRole('heading', { name: /moms best/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /quiche/i })).not.toBeInTheDocument();
  });

  it('should cancel a new recipe', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await screen.findByLabelText('username');

    // login
    await user.type(screen.getByLabelText(/username/i), 'un');
    await user.type(screen.getByLabelText(/password/i), 'pw');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // navigate to recipe list and click add
    await user.click(await screen.findByRole('link', { name: /recipes/i }));
    await user.click(await screen.findByRole('link', { name: /add/i }));

    // assert on the new page
    expect(global.location.pathname).toEqual('/recipe/new/edit');
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredient list/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // cancel
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    // assert no recipe added and back on recipe list
    expect(global.location.pathname).toEqual('/recipe');
    expect(await screen.findByText(/update cancelled/i)).toBeInTheDocument();
  });

  it('should create a new recipe', async () => {
    setBrowserLocation();
    const { user } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await screen.findByLabelText('username');

    // login
    await user.type(screen.getByLabelText(/username/i), 'un');
    await user.type(screen.getByLabelText(/password/i), 'pw');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // navigate to recipe list and click add
    await user.click(screen.getByRole('link', { name: /recipes/i }));
    await user.click(await screen.findByRole('link', { name: /add/i }));

    // assert on the new page
    expect(global.location.pathname).toEqual('/recipe/new/edit');

    await user.type(screen.getByLabelText(/title/i), testing.title);
    await user.type(screen.getByLabelText(/description/i), testing.description);
    await user.type(screen.getByLabelText(/ingredient list/i), testing.ingredients);
    await user.type(screen.getByLabelText(/directions/i), testing.directions);
    await user.selectOptions(
      screen.getByLabelText(/category/i),
      await screen.findByRole('option', { name: 'other' }),
    );
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText(/recipe saved/i)).toBeInTheDocument();

    // assert on the new page with new values
    expect(global.location.pathname).toEqual('/recipe/testing');
    expect(screen.getByText(testing.title)).toBeInTheDocument();
    expect(screen.getByText(`- ${testing.category}`)).toBeInTheDocument();
    expect(screen.getByText(testing.description)).toBeInTheDocument();
    expect(screen.getByText(testing.ingredients)).toBeInTheDocument();
    expect(screen.getByText(testing.directions)).toBeInTheDocument();
  });
});
