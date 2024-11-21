import { EmptyState } from '@/components/EmptyState';
import { Spinner } from '@/components/Spinner';
import { CardUsers } from '@/components/TableUser/card-users';
import { columnsDesktop, columnsMobile } from '@/components/TableUser/column';
import { DataTable } from '@/components/TableUser/data-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { } from '@/components/ui/collapsible';
import DotPattern from '@/components/ui/dot-pattern';
import ShimmerButton from '@/components/ui/shimmer-button';
import { useLatestUpdate, useMostActiveUsers } from '@/lib/api';
import { cn, } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';

export const Home = () => {
  const isMd = useMediaQuery('(min-width: 768px)');
  const { data, isLoading, isError } = useMostActiveUsers();
  const { data: lastUpdatedData } = useLatestUpdate();

  if (isLoading)
    return (
      <div className="relative py-16 max-w-4xl mx-auto flex flex-col justify-center items-center gap-8 text-center">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <EmptyState title='Failed to fetch data statistics, please try again later!' />
    );

  return (
    <div className="container mx-auto p-4 space-y-10">
      {isMd ? (
        <DataTable
          columns={columnsDesktop}
          data={data?.users || []}
          updatedAt={new Date(lastUpdatedData?.[0]?.commit?.committer?.date)}
        />
      ) : (
        <CardUsers
          columns={columnsMobile}
          data={data?.users || []}
          updatedAt={new Date(lastUpdatedData?.[0]?.commit?.committer?.date)}
        />
      )}

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Frequently Asked Questions
        </h2>

        <Accordion type="multiple">
          <AccordionItem value="faq-1">
            <AccordionTrigger>
              How to be indexed in this project?
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside">
                <li>Set "Indonesia" as your location.</li>
                <li>Have at least 22 followers.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>When the data will be updated?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside">
                <li>
                  The data is not updated in real time, expect some delay.
                </li>
                <li>
                  The cronjob scheduler will run in the daily basis to update
                  the data.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="relative py-16 max-w-4xl mx-auto flex flex-col justify-center items-center gap-8">
        <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Embeed Your Stats!
        </h2>

        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
          )}
        />

        <div className="relative">
          <a
            href="https://github.com/depapp/IndoGitHubers/blob/main/BADGE_USAGE.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Create badge
              </span>
            </ShimmerButton>
          </a>
        </div>
      </div>
    </div>
  );
};