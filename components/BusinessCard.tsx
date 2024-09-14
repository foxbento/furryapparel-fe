import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Tags, Calendar } from 'lucide-react';

interface Business {
  id: number;
  name: string;
  link: string;
  type: string;
  country: string;
  state: string;
  nsfw: boolean;
  overview: string;
  gendered: string;
  conventions: boolean;
}

interface BusinessCardProps {
  business: Business;
}

const formatLocation = (state: string, country: string): string | null => {
  if (state && country) {
    return `${state}, ${country}`;
  } else if (state) {
    return state;
  } else if (country) {
    return country;
  }
  return null;
};

export function BusinessCard({ business }: BusinessCardProps) {
  const location = formatLocation(business.state, business.country);

  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{business.name}</CardTitle>
          <a 
            href={business.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="Visit store"
          >
            <ExternalLink size={20} />
          </a>
        </div>
        {location && (
          <div className="flex items-center text-sm text-slate-400 mt-1">
            <MapPin size={14} className="mr-1" />
            {location}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-slate-300 mb-3 line-clamp-2">{business.overview}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Tags size={12} />
            {business.type}
          </Badge>
          {business.conventions && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar size={12} />
              Conventions
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-3 flex justify-between items-center border-t border-slate-700">
        <div className="flex gap-2">
          <Badge variant={business.nsfw ? "destructive" : "secondary"} className="text-xs">
            {business.nsfw ? "NSFW" : "SFW"}
          </Badge>
          {business.gendered && <Badge className="text-xs">{business.gendered}</Badge>}
        </div>
        {/* You can add a rating or review count here if available */}
      </CardFooter>
    </Card>
  );
}