import { Grid, TextField } from '@mui/material'
import React from 'react'

export default function RecoverPassword() {
    return (
            <Grid
                container
                spacing={2}
                sx={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 0,
                    paddingBottom: 5,
                }}>
                <Grid item xs={12}>
                    <h4
                        style={{
                            fontWeight: "normal",
                            justifyContent: "center",
                        }}>
                        Introduce el correo electrónico asociado a tu cuenta para
                        cambiar tu contraseña.
                    </h4>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Ingrese Email"
                        sx={{ width: "100%" }}
                        name="email"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        onClick={() => setType("paso3")}
                        fullWidth
                        sx={{ borderRadius: 9 }}
                        variant="contained"
                        color="primary">
                        Siguiente
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        onClick={() => setType("login")}
                        fullWidth
                        variant="text">
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
    )
}
