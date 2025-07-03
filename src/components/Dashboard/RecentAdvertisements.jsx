import { Typography, Button, Chip } from "@material-tailwind/react";
import { Link } from "react-router";
import { format } from "date-fns";

const TABLE_HEAD = ["Title", "Owner", "Status", "Location", "Created At"];

const RecentAdvertisements = ({ advertisements }) => {
  const sorted = [...(advertisements || [])]?.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime() || 0;
    const dateB = new Date(b.created_at).getTime() || 0;
    return dateB - dateA;
  });

  const recentAdvertisements = sorted.slice(0, 6);
  return (
    <div className="w-full bg-white p-4 md:p-8 shadow-sm rounded-lg">
      <div className="mb-5 flex items-center justify-between gap-8">
        <div>
          <Typography type="h6">Recent Advertisements</Typography>
        </div>
        <div>
          <Button color="secondary" size="sm">
            <Link to="/dashboard/advertisements">View all</Link>
          </Button>
        </div>
      </div>
      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-surface">
        <table className="w-full">
          <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="px-2.5 py-2 text-start font-medium">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="group text-sm text-black dark:text-white">
            {recentAdvertisements?.map((recentAds) => (
              <tr
                key={recentAds.id}
                className="border-b border-surface last:border-0"
              >
                <td className="p-3 min-w-40">
                  <Typography type="small">{recentAds.title}</Typography>
                </td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <Typography type="small">{recentAds.owner.name}</Typography>
                    <Typography type="small" className="opacity-70">
                      {recentAds.owner.email}
                    </Typography>
                  </div>
                </td>
                <td className="p-3">
                  <div className="w-max">
                    <Chip
                      size="sm"
                      color={`${
                        recentAds.status == "Approved" ? "success" : "secondary"
                      }`}
                    >
                      <Chip.Label>{recentAds.status}</Chip.Label>
                    </Chip>
                  </div>
                </td>
                <td className="p-3 min-w-40">
                  <Typography type="small">{recentAds.location}</Typography>
                </td>
                <td className="p-3 min-w-48">
                  {recentAds.created_at
                    ? format(
                        new Date(recentAds.created_at),
                        "MMMM d, yyyy, h:mm a"
                      )
                    : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAdvertisements;
