import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});
const RadioButtonsGroup = Loadable({
  loader: () => import("./RadioGroup"),
  loading: () => <Loading />
});

const Tooltip = Loadable({
  loader: () => import("./Tooltip"),
  loading: () => <Loading />
});

const CustomTab = Loadable({
  loader: () => import("./CustomTab"),
  loading: () => <Loading />
});

const UploadSingleFile = Loadable({
  loader: () => import("./UploadSingleFile"),
  loading: () => <Loading />
});

const DocumentList = Loadable({
  loader: () => import("./DocumentList"),
  loading: () => <Loading />
});

const DividerWithLabel = Loadable({
  loader: () => import("./DividerWithLabel"),
  loading: () => <Loading />
});

const MapLocator = Loadable({
  loader: () => import("./MapLocator"),
  loading: () => <Loading />
});

const FeesEstimateCard = Loadable({
  loader: () => import("./FeesEstimateCard"),
  loading: () => <Loading />
});

const HowItWorks = Loadable({
  loader: () => import("./HowItWorks"),
  loading: () => <Loading />
});


const MultiSelect = Loadable({
  loader: () => import("./MultiSelect"),
  loading: () => <Loading />
});

const SampleDownload = Loadable({
  loader: () => import("./SampleDownload"),
  loading: () => <Loading />
});

const RichTextEditor = Loadable({
  loader: () => import("./RichTextEditor"),
  loading: () => <Loading />
});

const MultiSelectPress = Loadable({
  loader: () => import("./MultiSelectPress"),
  loading: () => <Loading />
});

const UploadExternalGuests = Loadable({
  loader: () => import("./UploadExternalGuests"),
  loading: () => <Loading />
});

const UploadMultipleFiles = Loadable({
  loader: () => import("./UploadMultipleFiles"),
  loading: () => <Loading />
});

const HTMLContent = Loadable({
  loader: () => import("./HTMLContent"),
  loading: () => <Loading />
});
const DocumentTenderList = Loadable({
  loader: () => import("./DocumentTenderList"),
  loading: () => <Loading />
});
export {
  TestMolecules,
  RadioButtonsGroup,
  Tooltip,
  CustomTab,
  UploadSingleFile,
  DocumentList,
  MapLocator,
  FeesEstimateCard,
  DividerWithLabel,
  HowItWorks,
  MultiSelect,
  SampleDownload,
  RichTextEditor,
  MultiSelectPress,
  UploadExternalGuests,
  UploadMultipleFiles,
  HTMLContent,
  DocumentTenderList
};
