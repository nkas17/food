import * as React from 'react';
import { Card, Page } from '@nmw/react-components';

function About() {
  return (
    <Page>
      <Card type="filled">
        <p className="about-body">
          this application will be very helpful for all things food, planning meals and creating
          grocery lists. add, edit, delete recipes, create meal plans, create grocery lists based on
          meal plans, and create custom ingredient lists that can merge with meal grocery list to
          end with a full grocery list... well that&apos;s the vision anyway...
        </p>
        <p className="nmw-fine-print">
          written with care by <a href="https://nathanmweller.com/">nathan m weller</a>
        </p>
      </Card>
    </Page>
  );
}

export default About;
