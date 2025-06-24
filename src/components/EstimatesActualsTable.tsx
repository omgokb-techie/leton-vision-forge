
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface TableProps {
  view: "summary" | "detailed";
}

interface ItemLine {
  id: string;
  itemLine: string;
  estCost: number;
  actCost: number;
  estRev: number;
  actRev: number;
  status: "completed" | "in-progress" | "planned";
}

const mockData: ItemLine[] = [
  {
    id: "1",
    itemLine: "Project Planning & Analysis",
    estCost: 5000,
    actCost: 4800,
    estRev: 8000,
    actRev: 8200,
    status: "completed"
  },
  {
    id: "2", 
    itemLine: "UI/UX Design Development",
    estCost: 12000,
    actCost: 13500,
    estRev: 18000,
    actRev: 19000,
    status: "completed"
  },
  {
    id: "3",
    itemLine: "Frontend Development",
    estCost: 25000,
    actCost: 26800,
    estRev: 35000,
    actRev: 36500,
    status: "in-progress"
  },
  {
    id: "4",
    itemLine: "Backend Infrastructure", 
    estCost: 20000,
    actCost: 22000,
    estRev: 28000,
    actRev: 29000,
    status: "in-progress"
  },
  {
    id: "5",
    itemLine: "Database Design & Setup",
    estCost: 8000,
    actCost: 7500,
    estRev: 12000,
    actRev: 12500,
    status: "completed"
  },
  {
    id: "6",
    itemLine: "API Development",
    estCost: 15000,
    actCost: 16200,
    estRev: 22000,
    actRev: 23000,
    status: "in-progress"
  },
  {
    id: "7",
    itemLine: "Testing & Quality Assurance",
    estCost: 10000,
    actCost: 0,
    estRev: 15000,
    actRev: 0,
    status: "planned"
  },
  {
    id: "8",
    itemLine: "Security Implementation",
    estCost: 8000,
    actCost: 8700,
    estRev: 12000,
    actRev: 12800,
    status: "completed"
  },
  {
    id: "9",
    itemLine: "Performance Optimization",
    estCost: 6000,
    actCost: 0,
    estRev: 9000,
    actRev: 0,
    status: "planned"
  },
  {
    id: "10",
    itemLine: "Documentation & Training",
    estCost: 5000,
    actCost: 0,
    estRev: 8000,
    actRev: 0,
    status: "planned"
  },
  {
    id: "11",
    itemLine: "Deployment & Launch",
    estCost: 7000,
    actCost: 0,
    estRev: 10000,
    actRev: 0,
    status: "planned"
  },
  {
    id: "12",
    itemLine: "Post-Launch Support",
    estCost: 4000,
    actCost: 0,
    estRev: 7000,
    actRev: 0,
    status: "planned"
  }
];

export const EstimatesActualsTable = ({ view }: TableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = mockData.filter(item => {
    const matchesSearch = item.itemLine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateTotal = (field: keyof ItemLine) => {
    return filteredData.reduce((sum, item) => sum + (item[field] as number), 0);
  };

  const calculateProfitability = (estCost: number, actCost: number, estRev: number, actRev: number) => {
    const cost = actCost || estCost;
    const revenue = actRev || estRev;
    return cost > 0 ? ((revenue - cost) / cost * 100) : 0;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800", 
      planned: "bg-gray-100 text-gray-800"
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  if (view === "summary") {
    const totalEstCost = calculateTotal("estCost");
    const totalActCost = calculateTotal("actCost");
    const totalEstRev = calculateTotal("estRev");
    const totalActRev = calculateTotal("actRev");
    const overallProfitability = calculateProfitability(totalEstCost, totalActCost, totalEstRev, totalActRev);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Est. Cost</p>
            <p className="text-2xl font-bold text-blue-700">€{totalEstCost.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600 font-medium">Total Act. Cost</p>
            <p className="text-2xl font-bold text-red-700">€{totalActCost.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Total Est. Revenue</p>
            <p className="text-2xl font-bold text-green-700">€{totalEstRev.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Profitability</p>
            <p className="text-2xl font-bold text-purple-700">{overallProfitability.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search item lines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Item Line</TableHead>
              <TableHead className="font-semibold text-right">Est Cost</TableHead>
              <TableHead className="font-semibold text-right">Act Cost</TableHead>
              <TableHead className="font-semibold text-right">Est Rev</TableHead>
              <TableHead className="font-semibold text-right">Act Rev</TableHead>
              <TableHead className="font-semibold text-right">Profit %</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => {
              const profitability = calculateProfitability(item.estCost, item.actCost, item.estRev, item.actRev);
              return (
                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{item.itemLine}</TableCell>
                  <TableCell className="text-right">€{item.estCost.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {item.actCost > 0 ? `€${item.actCost.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell className="text-right">€{item.estRev.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {item.actRev > 0 ? `€${item.actRev.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${profitability >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {profitability.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              );
            })}
            {/* Totals Row */}
            <TableRow className="bg-gray-100 font-semibold border-t-2">
              <TableCell>TOTALS</TableCell>
              <TableCell className="text-right">€{calculateTotal("estCost").toLocaleString()}</TableCell>
              <TableCell className="text-right">€{calculateTotal("actCost").toLocaleString()}</TableCell>
              <TableCell className="text-right">€{calculateTotal("estRev").toLocaleString()}</TableCell>
              <TableCell className="text-right">€{calculateTotal("actRev").toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <span className="text-green-600">
                  {calculateProfitability(
                    calculateTotal("estCost"),
                    calculateTotal("actCost"), 
                    calculateTotal("estRev"),
                    calculateTotal("actRev")
                  ).toFixed(1)}%
                </span>
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
