import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  CircularProgress,
  Divider,
  Alert,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { OPEN_METEO_BASE_URL } from './config';

const getWeatherBackground = (weatherCode, isDarkMode) => {
  // Clear sky
  if (weatherCode === 0 || weatherCode === 1) {
    return isDarkMode
      ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
      : 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)';
  }
  // Partly cloudy
  if (weatherCode === 2) {
    return isDarkMode
      ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
      : 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)';
  }
  // Overcast
  if (weatherCode === 3) {
    return isDarkMode
      ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
      : 'linear-gradient(135deg, #64b5f6 0%, #1976d2 100%)';
  }
  // Rain
  if (weatherCode >= 51 && weatherCode <= 82) {
    return isDarkMode
      ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
      : 'linear-gradient(135deg, #29b6f6 0%, #0277bd 100%)';
  }
  // Snow
  if (weatherCode >= 71 && weatherCode <= 86) {
    return isDarkMode
      ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
      : 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)';
  }
  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return isDarkMode
      ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
      : 'linear-gradient(135deg, #0d47a1 0%, #01579b 100%)';
  }
  // Default (unknown weather)
  return isDarkMode
    ? 'linear-gradient(135deg, #0a4da2 0%, #051c3b 100%)'
    : 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)';
};

const StyledContainer = styled(Container)(({ theme, weathercode }) => ({
  minHeight: '100vh',
  padding: 0,
  background: weathercode ? 
    getWeatherBackground(weathercode, theme.palette.mode === 'dark') : 
    'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)', // Navy sky blue background
  transition: 'all 0.5s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 60%)',
    zIndex: -1,
    opacity: 0.8,
    animation: 'pulse 15s ease-in-out infinite alternate',
  },
  '&::after': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,10,50,0.3) 0%, transparent 70%)',
    zIndex: -1,
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 0.5,
      transform: 'scale(1) translate(0, 0)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'scale(1.05) translate(1%, -1%)',
    },
    '100%': {
      opacity: 0.5,
      transform: 'scale(1) translate(0, 0)',
    },
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  }
}));

// Add animated particles to the background
const ParticleContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: 'hidden',
  '& .particle': {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  '& .particle:nth-of-type(1)': {
    top: '20%',
    left: '10%',
    animation: 'particle1 15s linear infinite',
  },
  '& .particle:nth-of-type(2)': {
    top: '60%',
    left: '30%',
    width: '12px',
    height: '12px',
    animation: 'particle2 20s linear infinite',
  },
  '& .particle:nth-of-type(3)': {
    top: '30%',
    left: '60%',
    width: '6px',
    height: '6px',
    animation: 'particle3 18s linear infinite',
  },
  '& .particle:nth-of-type(4)': {
    top: '70%',
    left: '80%',
    width: '10px',
    height: '10px',
    animation: 'particle4 25s linear infinite',
  },
  '& .particle:nth-of-type(5)': {
    top: '40%',
    left: '40%',
    width: '14px',
    height: '14px',
    animation: 'particle5 22s linear infinite',
  },
  '@keyframes particle1': {
    '0%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(100px, 50px)' },
    '50%': { transform: 'translate(50px, 100px)' },
    '75%': { transform: 'translate(-50px, 50px)' },
    '100%': { transform: 'translate(0, 0)' },
  },
  '@keyframes particle2': {
    '0%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(-80px, 40px)' },
    '50%': { transform: 'translate(-40px, -80px)' },
    '75%': { transform: 'translate(40px, -40px)' },
    '100%': { transform: 'translate(0, 0)' },
  },
  '@keyframes particle3': {
    '0%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(70px, -30px)' },
    '50%': { transform: 'translate(30px, 70px)' },
    '75%': { transform: 'translate(-70px, 30px)' },
    '100%': { transform: 'translate(0, 0)' },
  },
  '@keyframes particle4': {
    '0%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(-90px, -20px)' },
    '50%': { transform: 'translate(-60px, -90px)' },
    '75%': { transform: 'translate(30px, -70px)' },
    '100%': { transform: 'translate(0, 0)' },
  },
  '@keyframes particle5': {
    '0%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(50px, 60px)' },
    '50%': { transform: 'translate(-50px, 30px)' },
    '75%': { transform: 'translate(-20px, -60px)' },
    '100%': { transform: 'translate(0, 0)' },
  },
}));

const WeatherCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
  borderRadius: '16px',
  boxShadow: 'none',
  marginTop: theme.spacing(4),
  backgroundColor: 'transparent',
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: '100%',
  maxWidth: '100%',
  margin: '0',
}));

const WeatherInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  backgroundColor: 'rgba(0,0,0,0.15)',
  backdropFilter: 'blur(10px)',
  '& .MuiTypography-root': {
    fontSize: '1rem',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  }
}));

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const fetchWeather = async (city) => {
    try {
      // First, get coordinates for the city using the geocoding API
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors'
        }
      );

      if (!geocodingResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const geocodingData = await geocodingResponse.json();
      
      if (!geocodingData.results || geocodingData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country_code } = geocodingData.results[0];

      // Then, get weather data for those coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,visibility,weather_code&daily=sunrise,sunset,weather_code&timezone=auto`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors'
        }
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();

      if (!weatherData.current) {
        throw new Error('Invalid weather data received');
      }

      // Transform the data to match our app's format
      return {
        name,
        sys: {
          country: country_code,
          sunrise: new Date(weatherData.daily.sunrise[0]).getTime() / 1000,
          sunset: new Date(weatherData.daily.sunset[0]).getTime() / 1000
        },
        weather: [{
          id: weatherData.current.weather_code,
          description: getWeatherDescription(weatherData.current.weather_code)
        }],
        main: {
          temp: weatherData.current.temperature_2m,
          feels_like: weatherData.current.apparent_temperature,
          humidity: weatherData.current.relative_humidity_2m,
          pressure: weatherData.current.pressure_msl
        },
        wind: {
          speed: weatherData.current.wind_speed_10m
        },
        visibility: weatherData.current.visibility * 1000 // Convert to meters
      };
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error - Please check your internet connection');
      }
      throw error;
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code) => {
    // WMO Weather interpretation codes
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
  };

  const getWeatherIcon = (weatherCode) => {
    // WMO Weather interpretation codes
    if (weatherCode === 0 || weatherCode === 1) return '☀️'; // Clear sky
    if (weatherCode === 2) return '⛅'; // Partly cloudy
    if (weatherCode === 3) return '☁️'; // Overcast
    if (weatherCode === 45 || weatherCode === 48) return '🌫️'; // Fog
    if (weatherCode >= 51 && weatherCode <= 55) return '🌧️'; // Drizzle
    if (weatherCode >= 61 && weatherCode <= 65) return '🌦️'; // Rain
    if (weatherCode >= 71 && weatherCode <= 77) return '🌨️'; // Snow
    if (weatherCode >= 80 && weatherCode <= 82) return '🌧️'; // Rain showers
    if (weatherCode >= 85 && weatherCode <= 86) return '🌨️'; // Snow showers
    if (weatherCode >= 95 && weatherCode <= 99) return '⛈️'; // Thunderstorm
    return '❓';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer 
        maxWidth="md" 
        weathercode={weather?.weather[0]?.id || 0}
      >
        {/* Animated Particles */}
        <ParticleContainer>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </ParticleContainer>
      
        {/* Dark mode toggle */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          padding: '16px',
          position: 'absolute',
          top: 5,
          right: 16,
          zIndex: 1000,
        }}>
          <IconButton 
            onClick={() => setDarkMode(!darkMode)} 
            sx={{
              backgroundColor: 'rgba(0,0,0,0.25)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.4)',
              }
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Box sx={{ 
          padding: '16px 16px 16px 16px',
          paddingTop: '24px',
          width: '100%',
          position: 'relative',
          zIndex: 900,
          paddingRight: '72px', // Add space for the toggle button
        }}>
          <SearchBox>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              error={!!error}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  color: '#fff',
                  height: '56px',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                    borderWidth: 0,
                  }
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.7)',
                    opacity: 1,
                  }
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              sx={{
                borderRadius: '8px',
                minWidth: '56px',
                height: '56px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                color: '#fff',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  boxShadow: 'none',
                }
              }}
            >
              <SearchIcon />
            </Button>
          </SearchBox>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 2,
                borderRadius: '8px',
                backgroundColor: 'rgba(40, 20, 20, 0.9)',
                color: '#fff'
              }}
            >
              {error}
            </Alert>
          )}
        </Box>

        {weather && (
          <Box sx={{ 
            textAlign: 'center',
            padding: { xs: '0 16px 24px', sm: '0 24px 32px' },
            mt: 2
          }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                color: '#fff',
                fontWeight: 500,
                mb: 4,
                fontSize: { xs: '2rem', sm: '3rem' },
              }}
            >
              {weather.name}, {weather.sys.country}
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                mb: 5,
                gap: { xs: 3, md: 6 }
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  <Typography sx={{ 
                    fontSize: { xs: '3.5rem', sm: '4rem' }, 
                    lineHeight: 1, 
                    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))'
                  }}>
                    {getWeatherIcon(weather.weather[0].id)}
                  </Typography>
                </Box>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '5rem', sm: '8rem' },
                    color: '#fff',
                    fontWeight: 300,
                    lineHeight: 1
                  }}
                >
                  {Math.round(weather.main.temp)}°C
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 400,
                    textTransform: 'capitalize',
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                  }}
                >
                  {weather.weather[0].description}
                </Typography>
              </Box>

              <Box sx={{ 
                width: '100%',
                maxWidth: { xs: '100%', md: '320px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
                <WeatherInfo>
                  <ThermostatIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff' }}>
                    Feels like: {Math.round(weather.main.feels_like)}°C
                  </Typography>
                </WeatherInfo>
                <WeatherInfo>
                  <WaterDropIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff' }}>
                    Humidity: {weather.main.humidity}%
                  </Typography>
                </WeatherInfo>
                <WeatherInfo>
                  <AirIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff' }}>
                    Wind: {weather.wind.speed} m/s
                  </Typography>
                </WeatherInfo>
                <WeatherInfo>
                  <CompressIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff' }}>
                    Pressure: {weather.main.pressure} hPa
                  </Typography>
                </WeatherInfo>
                <WeatherInfo>
                  <VisibilityIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff' }}>
                    Visibility: {(weather.visibility / 1000).toFixed(1)} km
                  </Typography>
                </WeatherInfo>
              </Box>
            </Box>

            <Divider sx={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto',
              mb: 3
            }} />

            <Grid 
              container 
              justifyContent="center" 
              sx={{ 
                maxWidth: '600px', 
                margin: '0 auto',
                mb: 3
              }}
            >
              <Grid item xs={12} md={8} sx={{ display: 'flex', gap: 2 }}>
                <Box 
                  sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5 }}>
                    Sunrise
                  </Typography>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </Typography>
                </Box>
                <Box 
                  sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5 }}>
                    Sunset
                  </Typography>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.6)',
                display: 'block',
                textAlign: 'center',
                mt: 3
              }}
            >
              Data source: Open-Meteo
            </Typography>
          </Box>
        )}

        {loading && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)'
            }}
          >
            <CircularProgress sx={{ color: '#fff' }} />
          </Box>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
