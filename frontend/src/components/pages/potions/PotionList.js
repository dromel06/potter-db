import { useState } from "react";

import { Grid, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import ListStatusButton from "../../ui/ListStatusButton";
import PotionListItem from "./PotionListItem";
import SearchField from "../../ui/SearchField";

const PotionList = ({ fetchPotions }) => {
  const [searchQuery, setSearchQuery] = useState();

  const {
    data: rawPotions,
    isFetchingNextPage,
    isSuccess,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["potions", searchQuery], fetchPotions, {
    retry: 10,
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length < (lastPage?.meta?.pagination?.last || 0)) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  return (
    <>
      <Typography variant="h3">Potion Search</Typography>
      <SearchField
        placeholder="e.g. Dragon tonic"
        handleChangeSearch={setSearchQuery}
        totalResults={
          rawPotions?.pages
            ? rawPotions?.pages[0]?.meta?.pagination?.records
            : 0
        }
      />
      {isSuccess && (
        <Grid container spacing={2}>
          {rawPotions?.pages?.map((page) =>
            page?.data?.map((potion) => {
              return <PotionListItem key={potion.id} potion={potion} />;
            })
          )}
        </Grid>
      )}
      <ListStatusButton
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        error={error}
        title="potions"
      />
    </>
  );
};

export default PotionList;
