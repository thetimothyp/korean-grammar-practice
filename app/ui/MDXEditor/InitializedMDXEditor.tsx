"use client"

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  directivesPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  toolbarPlugin,
  MDXEditor,
  AdmonitionDirectiveDescriptor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import { 
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertAdmonition,
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
      <InsertAdmonition />
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
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
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