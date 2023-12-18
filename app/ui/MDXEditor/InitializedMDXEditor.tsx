"use client"

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  toolbarPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import { 
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator
} from '@mdxeditor/editor';

function toolbarContents() {
  return (
    <>
      <BlockTypeSelect />
      <Separator />
      <BoldItalicUnderlineToggles />
      <Separator />
      <CreateLink />
      <InsertTable />
      <Separator />
      <ListsToggle />
      <Separator />
      <InsertThematicBreak />
    </>
  )
}

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        tablePlugin(),
        toolbarPlugin({ toolbarContents }),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}