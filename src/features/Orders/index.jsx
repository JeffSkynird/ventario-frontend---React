import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { cambiarMembresia, payment } from '../../services/api/memberships/memberships';
import { useAuth } from '../../hooks/useAuth';
import { obtenerUsuario } from '../../services/api/users/users';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    id: 1,
    pp_id: 'P-4S8940976J179264RMORZCNA',
    title: 'Estándar',
    name: "Estandar",
    price: '15',
    description: [
      'Resume texto, pdf e imágenes',
      'Máximo 5000 palabras',
      'Máximo 10 MB en archivos',
      'Soporte básico',
      'Máximo 50 resumenes mensuales',
    ],
    buttonText: 'Actual',
    buttonVariant: 'outlined',
    taken: true,
  },
  {
    id: 2,
    pp_id: 'P-9UM52751NL594354KMORZDGA',
    title: 'Pro',
    name: "Pro",
    price: '30',
    description: [
      'Todo lo del Plan estándar',
      'Resume también audio, video propios y de youtube (máximo 30 minutos)',
      'Soporte prioritario',
      'Máximo 1 gb en archivos',
      'Limite de videos y audios de 10 mensuales',
      'Máximo de 100 resumenes mensuales'
    ],
    buttonText: 'Cambiar',
    buttonVariant: 'contained',
    taken: false
  },
  {
    id: 3,
    pp_id: 'P-9UM52751NL594354KMORZDGA',
    title: 'Ultra',
    name: "Ultra",
    price: '80',
    description: [
      'Todo lo del Plan Pro',
      'Sin limite de MB',
      'El limite de los audios y videos aumentan a 60 minutos',
      'Limite de videos y audios de 20 mensuales',
      'Acceso a app móvil',
      'Acceso a API REST'
    ],
    buttonText: 'Cambiar',
    buttonVariant: 'contained',
    taken: false
  }
];



function PricingContent() {
  const { mostrarLoader, mostrarNotificacion, usuario, cargarUsuario } = useAuth()

  const [selected, setSelected] = React.useState(0);
  const [status, setStatus] = React.useState('')
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    obtenerAuth()
  }, [])
  const obtenerAuth = async () => {
    const data = await obtenerUsuario(usuario.token)
    if (data.status == 200) {
      if (data.data.subscriptions.length > 0) {
        setStatus(data.data.subscriptions[0].status)
        setName(data.plan.name)
        setPrice(data.plan.price)
      }
    }
  }
  const cambiarPlan = async (id) => {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
    mostrarLoader(true)
    const data = await cambiarMembresia({ membership_id: id }, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data)
  }

  const comprobarPlan = (nameTemp) => {
    if (nameTemp == name && status == "activa") {
      return "Actual";
    } else {
      return "Activar";
    }
  }
  const planBloqueado = (nameTemp) => {
    if (nameTemp == name && status == "activa") {
      return true;
    } else {
      return false;
    }
  }


  const handlePlan = async (id) => {
    const response = await payment({ plan_id: id }, usuario.token);
    console.log(response)
    if (validURL(response.data)) {
      window.open(response.data, "_blank");
    } else {
      mostrarNotificacion({type:"error", message:"Ha ocurrido un error inesperado"})
    }
  }

    function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(str);
    }
    return (
      <React.Fragment>
        <Container disableGutters maxWidth="sm" component="main">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Membresía
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Puedes cambiar tu membresía en cualquier momento
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container sx={{ marginTop: '1px' }} spacing={5} alignItems="center" justifyContent='center'>
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={ 12}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} disabled={planBloqueado(tier.name)} onClick={() => handlePlan(tier.pp_id)}>
                      {comprobarPlan(tier.name)}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Footer */}

        {/* End footer */}
      </React.Fragment>
    );
  }

  export default function Pricing() {
    return <PricingContent />;
  }