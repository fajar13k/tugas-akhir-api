import Cookies from 'js-cookie';
import { assign } from 'lodash';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, FormGroup, Input, Label } from 'reactstrap';
import { api } from '../utils/API';

const Auth = ({ origin = 'signin', onChangeSection, setRestrict }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async () => {
    let params = {
      username, password
    }
    const path = origin === 'signin' ? 'login/' : 'register/'

    if (origin === 'signup') {
      assign(params, { name });
    }

    setLoading(true);

    return await api.post(`auth/${path}`, params)
      .then((res) => {
        Cookies.set('heavyrotation', res.data.token);
        setRestrict();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setHasError(true);
        setErrorMessage(err?.response?.data?.msg);
      });
  }

  const renderText = () => {
    switch (origin) {
      case 'signin':
        return 'Sign In'
      case 'signup':
        return 'Sign Up'
      default:
        break;
    }
  }

  useEffect(() => {
    setName('');
    setUsername('');
    setPassword('');
  }, [origin]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className="px-3 py-4 w-25">
        <div className="mb-3">
          <span className="fs-2 fw-bold">{renderText()}</span>
        </div>

        {hasError && (<Alert color="danger">{errorMessage}</Alert>)}

        <Form className="w-100">
          {origin === 'signup' && (
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
          )}

          <FormGroup className="mt-3">
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormGroup>

          <FormGroup className="mt-3">
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>

          <div className="d-flex flex-column">
            <Button
              block
              className="mt-4"
              color="primary"
              disabled={isLoading}
              onClick={onSubmit}
              type="submit">
              <div className="d-flex justify-content-center">
                {renderText()}
              </div>
            </Button>

            <span
              className="text-center mt-3 text-info fw-bold"
              onClick={
                () => onChangeSection(origin === 'signin' ? 'signup' : 'signin')
              }
              disabled={isLoading}>
              {origin === 'signin' ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </Form>
      </Card>
    </div>
  )
};

export default Auth;