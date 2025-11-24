import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
interface Props {
    title: string | null;
    percentage: string | null;
    count: number | null;
    subtitle: string | null;   
}
export default function SummaryBox({title = "Total Customers", percentage = "12.5%", count = 19, subtitle = "Higher than last month"} : Props)
{
    return        <Card className="w-full max-w-xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            {title}
          </h3>
          <div className="flex items-center gap-1 rounded-full  px-3 py-1.5 text-xs font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>{percentage}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mt-0">
        <div className="text-3xl font-bold tracking-tight">
          {count}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span>{subtitle}</span>
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
}