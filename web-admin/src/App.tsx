import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Alert,
  CircularProgress
} from '@mui/material'
import {
  DirectionsCar,
  People,
  Warning,
  TrendingUp
} from '@mui/icons-material'

interface Vehicle {
  id: number
  licensePlate: string
  make: string
  model: string
  status: string
  location: {
    lat: number
    lng: number
    address: string
    timestamp: string
  }
}

interface DashboardStats {
  totalVehicles: number
  activeVehicles: number
  movingVehicles: number
  lastUpdate: string
}

const API_BASE = 'http://localhost:4000/api'

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      // Fetch vehicles
      const vehiclesResponse = await fetch(`${API_BASE}/vehicles`)
      const vehiclesData = await vehiclesResponse.json()
      
      // Fetch dashboard stats
      const statsResponse = await fetch(`${API_BASE}/dashboard`)
      const statsData = await statsResponse.json()

      if (vehiclesData.success) {
        setVehicles(vehiclesData.data)
      }
      
      if (statsData.success) {
        setStats(statsData.data)
      }
      
      setError('')
    } catch (err) {
      setError('Failed to connect to API. Make sure the backend server is running on port 4000.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'moving': return 'primary'
      case 'inactive': return 'default'
      default: return 'warning'
    }
  }

  const StatCard = ({ title, value, icon, color = 'primary' }: {
    title: string
    value: number | string
    icon: React.ReactNode
    color?: 'primary' | 'secondary' | 'success' | 'warning'
  }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DirectionsCar sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle Tracking Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={fetchData}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Vehicles"
              value={stats?.totalVehicles || 0}
              icon={<DirectionsCar fontSize="large" />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Vehicles"
              value={stats?.activeVehicles || 0}
              icon={<TrendingUp fontSize="large" />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Moving Vehicles"
              value={stats?.movingVehicles || 0}
              icon={<DirectionsCar fontSize="large" />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Alerts"
              value={3}
              icon={<Warning fontSize="large" />}
              color="secondary"
            />
          </Grid>
        </Grid>

        {/* Vehicles Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vehicle Fleet
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>License Plate</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Current Location</TableCell>
                    <TableCell>Last Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {vehicle.licensePlate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {vehicle.make} {vehicle.model}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={vehicle.status.toUpperCase()}
                          color={getStatusColor(vehicle.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {vehicle.location.address}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(vehicle.location.timestamp).toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Footer */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Vehicle Tracking Management System - Web Admin Dashboard
            {stats && (
              <> • Last updated: {new Date(stats.lastUpdate).toLocaleTime()}</>
            )}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default App