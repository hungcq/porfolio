import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Hung Chu (hungcq)'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Software Engineer, Reader, DotA 2 Player'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <MenuItems />
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const MenuItems = () => (
  <Container>
    <Menu.Item as='a' active>
      Home
    </Menu.Item>
    <Menu.Item as='a' href='https://goodreads.com/hungcq' target='_blank'>
      My Book List
    </Menu.Item>
    <Menu.Item as='a' href='https://dotabuff.com/players/87907151' target='_blank'>
      My DotaBuff
    </Menu.Item>
    <Menu.Item as='a' href='https://linkedin.com/in/hungcq/' target='_blank'>
      My Linkedin
    </Menu.Item>
    <Menu.Item as='a' href='https://github.com/hungcq/' target='_blank'>
      My Github
    </Menu.Item>
  </Container>
);

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <MenuItems />
          </Sidebar>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Currently A Software Engineer at Shopee Singapore
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              I have years of experience building scalable, distributed system for VNG and Shopee. I
              help companies and organization build simple software solutions.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              I Value Knowledge and Experience
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Always striving to be the best version of myself, I seek out new opportunities, new
              environments and new challenges, try to be humble and learn from the best.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/my-face.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Card.Group>
              <Card>
                <Card.Content>
                  <Card.Header as='a' href='https://tracuusinbad.com/order-status' target='_blank'>
                    Order Status
                  </Card.Header>
                  <Card.Meta>Order Tracking System for Sinbad Logistic</Card.Meta>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header as='a' href='http://18.140.67.5:3000/' target='_blank'>
                    Report Generator
                  </Card.Header>
                  <Card.Meta>Report Generator for Dong Anh Hospital</Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    {/*<Segment style={{ padding: '0em' }} vertical>*/}
    {/*  <Grid celled="internally" columns="equal" stackable>*/}
    {/*    <Grid.Row textAlign="center">*/}
    {/*       <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>*/}
    {/*         <Header as="h3" style={{ fontSize: '2em' }}>*/}
    {/*           "What a Company"*/}
    {/*         </Header>*/}
    {/*         <p style={{ fontSize: '1.33em' }}>That is what they all say about*/}
    {/*           us</p>*/}
    {/*       </Grid.Column>*/}
    {/*       <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>*/}
    {/*         <Header as="h3" style={{ fontSize: '2em' }}>*/}
    {/*           "I shouldn't have gone with their competitor."*/}
    {/*         </Header>*/}
    {/*         <p style={{ fontSize: '1.33em' }}>*/}
    {/*           <Image avatar src="/images/avatar/large/nan.jpg"/>*/}
    {/*          <b>Nan</b> Chief Fun Officer Acme Toys*/}
    {/*        </p>*/}
    {/*      </Grid.Column>*/}
    {/*    </Grid.Row>*/}
    {/*  </Grid>*/}
    {/*</Segment>*/}

    {/*<Segment style={{ padding: '8em 0em' }} vertical>*/}
    {/*  <Container text>*/}
    {/*    <Header as="h3" style={{ fontSize: '2em' }}>*/}
    {/*      Breaking The Grid, Grabs Your Attention*/}
    {/*    </Header>*/}
    {/*    <p style={{ fontSize: '1.33em' }}>*/}
    {/*      Instead of focusing on content creation and hard work, we have learned*/}
    {/*      how to master the*/}
    {/*      art of doing nothing by providing massive amounts of whitespace and*/}
    {/*      generic content that*/}
    {/*      can seem massive, monolithic and worth your attention.*/}
    {/*    </p>*/}
    {/*    <Button as="a" size="large">*/}
    {/*      Read More*/}
    {/*    </Button>*/}

    {/*    <Divider*/}
    {/*      as="h4"*/}
    {/*      className="header"*/}
    {/*      horizontal*/}
    {/*      style={{ margin: '3em 0em', textTransform: 'uppercase' }}*/}
    {/*    >*/}
    {/*      <a href="#">Case Studies</a>*/}
    {/*    </Divider>*/}

    {/*    <Header as="h3" style={{ fontSize: '2em' }}>*/}
    {/*      Did We Tell You About Our Bananas?*/}
    {/*    </Header>*/}
    {/*    <p style={{ fontSize: '1.33em' }}>*/}
    {/*      Yes I know you probably disregarded the earlier boasts as non-sequitur*/}
    {/*      filler content, but*/}
    {/*      it's really true. It took years of gene splicing and combinatory DNA*/}
    {/*      research, but our*/}
    {/*      bananas can really dance.*/}
    {/*    </p>*/}
    {/*    <Button as="a" size="large">*/}
    {/*      I'm Still Quite Interested*/}
    {/*    </Button>*/}
    {/*  </Container>*/}
    {/*</Segment>*/}

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a' href='mailto: hungcq1996@gmail.com'>
                  Email
                </List.Item>
                <List.Item as='a' href='tel: +84987134200'>
                  Phone
                </List.Item>
                {/*<List.Item as="a">Religious Ceremonies</List.Item>*/}
                {/*<List.Item as="a">Gazebo Plans</List.Item>*/}
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Building simple web applications</List.Item>
                <List.Item as='a'>Design distributed systems</List.Item>
                {/*<List.Item as="a">How To Access</List.Item>*/}
                {/*<List.Item as="a">Favorite X-Men</List.Item>*/}
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Hung Chu
              </Header>
              <p>Software Engineer at Shopee Singapore</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
