'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from 'use-debounce';
import { BusinessCard } from '@/components/BusinessCard';
import { CreditCallout } from '@/components/CreditCallout';
import { getApiUrl } from '@/utils/api';

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

const ITEMS_PER_PAGE = 9;

export default function BusinessList() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getApiUrl()}/api/businesses?page=${page}&pageSize=${ITEMS_PER_PAGE}&search=${debouncedSearchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch businesses');
      }
      const data = await response.json();
      setBusinesses(data.businesses);
      setTotalPages(Math.ceil(data.totalCount / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setError('Failed to load businesses. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearchTerm]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when search term changes
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-50">Furry Apparel</h1>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300 hover:bg-slate-600">
          <a
            href="https://twitter.com/lynxposter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            developed by @lynxposter
          </a>
        </Badge>
      </div>
      
      <CreditCallout />

      <Input
        type="text"
        placeholder="Search businesses..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : businesses.length === 0 ? (
          <div className="text-center text-slate-400">No businesses found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Button 
          onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} 
          disabled={page === 1 || isLoading}
        >
          Previous
        </Button>
        <span className="text-slate-300">Page {page} of {totalPages}</span>
        <Button 
          onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)} 
          disabled={page === totalPages || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}