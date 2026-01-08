import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockHospitals } from '@/data/mockData';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, Bed, Stethoscope, ExternalLink } from 'lucide-react';

const Hospitals = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const navigate = useNavigate();

  const regions = useMemo(() => {
    const unique = [...new Set(mockHospitals.map(h => h.region))];
    return unique.sort();
  }, []);

  const filtered = useMemo(() => {
    return mockHospitals.filter(h => {
      const matchesSearch = 
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.city.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === 'all' || h.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [search, region]);

  const handleViewDetails = (hospitalId: string) => {
    navigate(`/hospital/${hospitalId}`);
  };

  const handleCardClick = (hospitalId: string) => {
    navigate(`/hospital/${hospitalId}`);
  };

  return (
    <AppLayout title="All Hospitals" subtitle="Browse and explore partner hospitals">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search hospitals by name or city..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="pl-9" 
            />
          </div>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {mockHospitals.length} hospitals
        </p>

        {/* Hospital Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((hospital) => (
            <Card 
              key={hospital.id} 
              className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCardClick(hospital.id)}
              data-navigation
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={hospital.image} 
                  alt={hospital.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-3 right-3 bg-primary/90">
                  {hospital.region}
                </Badge>
              </div>

              <CardContent className="p-4">
                {/* Name & Location */}
                <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                  {hospital.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{hospital.city}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Bed className="h-4 w-4" />
                    <span>{hospital.beds} beds</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hospital.specialties.slice(0, 2).map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {hospital.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{hospital.specialties.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Map Preview */}
                <div className="mt-4 rounded-lg overflow-hidden border h-24 bg-muted relative">
                  <img 
                    src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+3b82f6(${hospital.coordinates.lng},${hospital.coordinates.lat})/${hospital.coordinates.lng},${hospital.coordinates.lat},11,0/300x120@2x?access_token=pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNWNvbmNqYzA4ZTQyaXM1YnMyMmJjamgifQ.fake`}
                    alt="Map preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                    <div className="text-center">
                      <MapPin className="h-6 w-6 mx-auto text-primary" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {hospital.coordinates.lat.toFixed(2)}°, {hospital.coordinates.lng.toFixed(2)}°
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(hospital.id);
                  }}
                  data-navigation
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No hospitals found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Hospitals;